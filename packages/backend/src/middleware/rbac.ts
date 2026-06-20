import { Context, Next } from 'hono';
import { AppError } from '../errors/AppError';
import { RolePermissions } from '@maxcash/shared';

export function requireRole(...allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user');
    
    if (!user) {
      throw AppError.unauthorized('User not authenticated');
    }
    
    const userRole = user.role as string;
    
    if (!allowedRoles.includes(userRole)) {
      throw AppError.forbidden('Insufficient permissions');
    }
    
    await next();
  };
}

export function requirePermission(permission: string) {
  return async (c: Context, next: Next) => {
    const user = c.get('user');
    
    if (!user) {
      throw AppError.unauthorized('User not authenticated');
    }
    
    const userRole = user.role as keyof typeof RolePermissions;
    const permissions = RolePermissions[userRole] || [];
    
    if (!permissions.includes(permission as any)) {
      throw AppError.forbidden(`Permission '${permission}' required`);
    }
    
    await next();
  };
}
