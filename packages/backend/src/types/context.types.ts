import { JWTPayload } from 'jose';

declare module 'hono' {
  interface ContextVariableMap {
    user: JWTPayload & { sub: string; email: string; role: string };
    userId: string;
    riskScore: number;
  }
}
