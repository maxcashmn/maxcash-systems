// src/middleware/rbac.ts

import type { MiddlewareHandler } from 'hono';

import { AppError } from '../errors/AppError';

import { RolePermissions } from '@maxcash/shared';


export function requireRole(
  ...allowedRoles: string[]
): MiddlewareHandler {

  return async (c, next) => {

    const user =
      c.get('user');


    if (!user) {
      throw AppError.unauthorized(
        'User not authenticated'
      );
    }


    if (
      !allowedRoles.includes(user.role)
    ) {
      throw AppError.forbidden(
        'Insufficient permissions'
      );
    }


    await next();
  };
}



export function requirePermission(
  permission: string
): MiddlewareHandler {

  return async (c, next) => {

    const user =
      c.get('user');


    if (!user) {
      throw AppError.unauthorized(
        'User not authenticated'
      );
    }


    const userRole =
      user.role as keyof typeof RolePermissions;


    const permissions =
      RolePermissions[userRole] ?? [];


    if (
      !permissions.includes(
        permission as never
      )
    ) {
      throw AppError.forbidden(
        `Permission '${permission}' required`
      );
    }


    await next();
  };
}