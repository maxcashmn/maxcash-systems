export const PERMISSIONS = {
  // User permissions
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  USER_UPDATE: 'user:update',

  // Loan permissions
  LOAN_READ: 'loan:read',
  LOAN_WRITE: 'loan:write',
  LOAN_APPROVE: 'loan:approve',
  LOAN_REJECT: 'loan:reject',
  LOAN_DISBURSE: 'loan:disburse',

  // Transaction permissions
  TRANSACTION_READ: 'transaction:read',
  TRANSACTION_WRITE: 'transaction:write',

  // Wallet permissions
  WALLET_READ: 'wallet:read',
  WALLET_WRITE: 'wallet:write',

  // Audit permissions
  AUDIT_READ: 'audit:read',
  AUDIT_WRITE: 'audit:write',

  // Admin permissions
  ADMIN_ACCESS: 'admin:access',
} as const;
