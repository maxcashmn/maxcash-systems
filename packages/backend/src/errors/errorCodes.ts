export const ErrorCodes = {
  // Auth Errors
  AUTH_001: 'AUTH_001',
  AUTH_002: 'AUTH_002',
  AUTH_003: 'AUTH_003',
  AUTH_004: 'AUTH_004',
  AUTH_005: 'AUTH_005',

  // User Errors
  USER_001: 'USER_001',
  USER_002: 'USER_002',
  USER_003: 'USER_003',
  USER_004: 'USER_004',

  // Loan Errors
  LOAN_001: 'LOAN_001',
  LOAN_002: 'LOAN_002',
  LOAN_003: 'LOAN_003',
  LOAN_004: 'LOAN_004',
  LOAN_005: 'LOAN_005',

  // Transaction Errors
  TXN_001: 'TXN_001',
  TXN_002: 'TXN_002',
  TXN_003: 'TXN_003',
  TXN_004: 'TXN_004',

  // Wallet Errors
  WLT_001: 'WLT_001',
  WLT_002: 'WLT_002',
  WLT_003: 'WLT_003',

  // General Errors
  GEN_001: 'GEN_001',
  GEN_002: 'GEN_002',
  GEN_003: 'GEN_003',
  GEN_004: 'GEN_004',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
