import { Context, Next } from 'hono';

// Simple in-memory idempotency store (use Redis or Cloudflare KV in production)
const idempotencyStore = new Map<string, { response: any; timestamp: number }>();

export function idempotencyMiddleware() {
  return async (c: Context, next: Next) => {
    // Only apply to POST, PUT, PATCH methods
    if (!['POST', 'PUT', 'PATCH'].includes(c.req.method)) {
      return await next();
    }
    
    const idempotencyKey = c.req.header('Idempotency-Key');
    
    if (!idempotencyKey) {
      return await next();
    }
    
    // Check if we've already processed this request
    const stored = idempotencyStore.get(idempotencyKey);
    
    if (stored) {
      // Return cached response (idempotent)
      return c.json(stored.response, 200);
    }
    
    // Process the request
    await next();
    
    // Store the response for future requests
    if (c.res.status >= 200 && c.res.status < 300) {
      const response = await c.res.json();
      idempotencyStore.set(idempotencyKey, {
        response,
        timestamp: Date.now(),
      });
      
      // Clean up old entries after 24 hours
      setTimeout(() => {
        idempotencyStore.delete(idempotencyKey);
      }, 24 * 60 * 60 * 1000);
    }
  };
}
