export const ErrorCodes = {
  // Auth Errors (AUTH-XXX)
  AUTH_001: 'AUTH_001',
  AUTH_002: 'AUTH_002',
  AUTH_003: 'AUTH_003',
  AUTH_004: 'AUTH_004',
  AUTH_005: 'AUTH_005',

  // User Errors (USER-XXX)
  USER_001: 'USER_001',
  USER_002: 'USER_002',
  USER_003: 'USER_003',
  USER_004: 'USER_004',

  // Loan Errors (LOAN-XXX)
  LOAN_001: 'LOAN_001',
  LOAN_002: 'LOAN_002',
  LOAN_003: 'LOAN_003',
  LOAN_004: 'LOAN_004',
  LOAN_005: 'LOAN_005',

  // Transaction Errors (TXN-XXX)
  TXN_001: 'TXN_001',
  TXN_002: 'TXN_002',
  TXN_003: 'TXN_003',
  TXN_004: 'TXN_004',

  // Wallet Errors (WLT-XXX)
  WLT_001: 'WLT_001',
  WLT_002: 'WLT_002',
  WLT_003: 'WLT_003',

  // General Errors (GEN-XXX)
  GEN_001: 'GEN_001',
  GEN_002: 'GEN_002',
  GEN_003: 'GEN_003',
  GEN_004: 'GEN_004',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

export const ErrorMessages: Record<ErrorCode, string> = {
  // Auth Errors
  [ErrorCodes.AUTH_001]: 'Invalid email or password',
  [ErrorCodes.AUTH_002]: 'Token has expired',
  [ErrorCodes.AUTH_003]: 'Invalid token',
  [ErrorCodes.AUTH_004]: 'Unauthorized access',
  [ErrorCodes.AUTH_005]: 'Refresh token is invalid or expired',

  // User Errors
  [ErrorCodes.USER_001]: 'User not found',
  [ErrorCodes.USER_002]: 'User already exists',
  [ErrorCodes.USER_003]: 'Invalid user data',
  [ErrorCodes.USER_004]: 'User account is not active',

  // Loan Errors
  [ErrorCodes.LOAN_001]: 'Loan not found',
  [ErrorCodes.LOAN_002]: 'Invalid loan amount',
  [ErrorCodes.LOAN_003]: 'Loan already approved',
  [ErrorCodes.LOAN_004]: 'Loan application already exists',
  [ErrorCodes.LOAN_005]: 'Loan cannot be processed',

  // Transaction Errors
  [ErrorCodes.TXN_001]: 'Transaction not found',
  [ErrorCodes.TXN_002]: 'Insufficient funds',
  [ErrorCodes.TXN_003]: 'Invalid transaction',
  [ErrorCodes.TXN_004]: 'Transaction failed',

  // Wallet Errors
  [ErrorCodes.WLT_001]: 'Wallet not found',
  [ErrorCodes.WLT_002]: 'Wallet is frozen',
  [ErrorCodes.WLT_003]: 'Insufficient balance',

  // General Errors
  [ErrorCodes.GEN_001]: 'Internal server error',
  [ErrorCodes.GEN_002]: 'Validation error',
  [ErrorCodes.GEN_003]: 'Resource not found',
  [ErrorCodes.GEN_004]: 'Service unavailable',
};
