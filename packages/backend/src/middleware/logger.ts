import { Context, Next } from 'hono';

export function loggerMiddleware() {
  return async (c: Context, next: Next) => {
    const start = Date.now();
    const method = c.req.method;
    const path = c.req.path;
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    
    console.log(`[${new Date().toISOString()}] ${method} ${path} - Request from ${ip}`);
    
    await next();
    
    const duration = Date.now() - start;
    const status = c.res.status;
    const logLevel = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info';
    
    console.log(`[${new Date().toISOString()}] ${method} ${path} - ${status} - ${duration}ms (${logLevel})`);
  };
}
