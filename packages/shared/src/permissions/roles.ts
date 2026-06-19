export const RolePermissions = {
  ADMIN: [
    'user:read',
    'user:write',
    'user:delete',
    'user:update',
    'loan:read',
    'loan:write',
    'loan:approve',
    'loan:reject',
    'loan:disburse',
    'transaction:read',
    'transaction:write',
    'wallet:read',
    'wallet:write',
    'audit:read',
    'audit:write',
    'admin:access',
  ],
  MANAGER: [
    'user:read',
    'user:update',
    'loan:read',
    'loan:write',
    'loan:approve',
    'loan:reject',
    'transaction:read',
    'wallet:read',
  ],
  AUDITOR: [
    'loan:read',
    'transaction:read',
    'wallet:read',
    'audit:read',
  ],
  BORROWER: [
    'user:read',
    'user:update',
    'loan:read',
    'loan:write',
    'transaction:read',
    'wallet:read',
  ],
} as const;

// Renamed to avoid conflict with enums
export type RoleType = keyof typeof RolePermissions;
export type PermissionType = typeof RolePermissions[RoleType][number];
