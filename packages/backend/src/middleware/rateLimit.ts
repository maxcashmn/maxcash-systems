import { Context, Next } from 'hono';

// Simple in-memory rate limiting (consider using Redis or Cloudflare KV in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export function rateLimit(config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }) {
  return async (c: Context, next: Next) => {
    const key = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const record = requestCounts.get(key);
    
    if (record) {
      if (now > record.resetTime) {
        // Reset window
        requestCounts.set(key, { count: 1, resetTime: now + config.windowMs });
      } else if (record.count >= config.maxRequests) {
        return c.json({
          success: false,
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        }, 429);
      } else {
        record.count++;
        requestCounts.set(key, record);
      }
    } else {
      requestCounts.set(key, { count: 1, resetTime: now + config.windowMs });
    }
    
    await next();
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts) {
    if (now > value.resetTime) {
      requestCounts.delete(key);
    }
  }
}, 60000);
