import { Context, Next } from 'hono';

interface RiskCheckResult {
  passed: boolean;
  reason?: string;
  score: number;
}

export class RiskChecker {
  private static instance: RiskChecker;
  private suspiciousIPs: Set<string> = new Set();
  private failedAttempts: Map<string, { count: number; firstAttempt: number }> = new Map();

  static getInstance(): RiskChecker {
    if (!RiskChecker.instance) {
      RiskChecker.instance = new RiskChecker();
    }
    return RiskChecker.instance;
  }

  async check(c: Context): Promise<RiskCheckResult> {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const userAgent = c.req.header('user-agent') || '';
    const score = this.calculateRiskScore(ip, userAgent);
    
    if (this.suspiciousIPs.has(ip)) {
      return {
        passed: false,
        reason: 'IP address flagged as suspicious',
        score,
      };
    }
    
    if (score > 70) {
      return {
        passed: false,
        reason: 'Risk score too high',
        score,
      };
    }
    
    return {
      passed: true,
      score,
    };
  }

  private calculateRiskScore(ip: string, userAgent: string): number {
    let score = 0;
    
    // Check for suspicious user agents (bots, scrapers)
    const suspiciousAgents = ['bot', 'crawler', 'scraper', 'curl', 'wget'];
    if (suspiciousAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
      score += 30;
    }
    
    // Check for failed login attempts from this IP
    const attempts = this.failedAttempts.get(ip);
    if (attempts) {
      const timeSinceFirst = Date.now() - attempts.firstAttempt;
      if (timeSinceFirst < 60000 && attempts.count > 5) {
        score += 40;
      } else if (timeSinceFirst < 300000 && attempts.count > 20) {
        score += 60;
      }
    }
    
    return Math.min(score, 100);
  }

  recordFailedAttempt(ip: string): void {
    const existing = this.failedAttempts.get(ip);
    if (existing) {
      existing.count++;
      if (existing.count > 10) {
        this.suspiciousIPs.add(ip);
      }
    } else {
      this.failedAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
    }
  }

  clearSuspiciousIP(ip: string): void {
    this.suspiciousIPs.delete(ip);
  }
}

export async function riskCheckMiddleware(c: Context, next: Next) {
  const checker = RiskChecker.getInstance();
  const result = await checker.check(c);
  
  if (!result.passed) {
    return c.json({
      success: false,
      message: `Request blocked due to risk check: ${result.reason}`,
      score: result.score,
      timestamp: new Date().toISOString(),
    }, 403);
  }
  
  c.set('riskScore', result.score);
  await next();
}
