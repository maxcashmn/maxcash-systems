import { Context, Next } from 'hono';
import { verifyJWT } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw AppError.unauthorized('No token provided');
  }
  
  const token = authHeader.substring(7);
  
  try {
    const payload = await verifyJWT(token);
    c.set('user', payload);
    c.set('userId', payload.sub);
    await next();
  } catch (error) {
    throw AppError.unauthorized('Invalid or expired token');
  }
}

export function optionalAuth(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    verifyJWT(token)
      .then((payload) => {
        c.set('user', payload);
        c.set('userId', payload.sub);
      })
      .catch(() => {});
  }
  
  return next();
}
