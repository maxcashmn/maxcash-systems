import { Context, Next } from 'hono';
import { appConfig } from '../config';

export function corsMiddleware() {
  return async (c: Context, next: Next) => {
    const origin = c.req.header('Origin') || '';
    const allowedOrigins = appConfig.cors.allowedOrigins;
    
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      c.header('Access-Control-Allow-Origin', origin);
      c.header('Access-Control-Allow-Credentials', 'true');
      c.header('Access-Control-Allow-Methods', appConfig.cors.allowedMethods.join(', '));
      c.header('Access-Control-Allow-Headers', appConfig.cors.allowedHeaders.join(', '));
      c.header('Access-Control-Expose-Headers', 'Content-Length, X-Request-Id');
    }
    
    // Handle preflight requests
    if (c.req.method === 'OPTIONS') {
      c.header('Access-Control-Max-Age', '86400');
      return c.body(null, 204);
    }
    
    await next();
  };
}
