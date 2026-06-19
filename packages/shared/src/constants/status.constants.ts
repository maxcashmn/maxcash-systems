export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const ERROR_CODES = {
  // Auth errors
  AUTH_001: 'AUTH_001', // Invalid credentials
  AUTH_002: 'AUTH_002', // Token expired
  AUTH_003: 'AUTH_003', // Invalid token
  AUTH_004: 'AUTH_004', // Unauthorized

  // User errors
  USER_001: 'USER_001', // User not found
  USER_002: 'USER_002', // User already exists
  USER_003: 'USER_003', // Invalid user data

  // Loan errors
  LOAN_001: 'LOAN_001', // Loan not found
  LOAN_002: 'LOAN_002', // Invalid loan amount
  LOAN_003: 'LOAN_003', // Loan already approved

  // Transaction errors
  TXN_001: 'TXN_001', // Transaction not found
  TXN_002: 'TXN_002', // Insufficient funds
  TXN_003: 'TXN_003', // Invalid transaction

  // Wallet errors
  WLT_001: 'WLT_001', // Wallet not found
  WLT_002: 'WLT_002', // Wallet frozen
  WLT_003: 'WLT_003', // Insufficient balance

  // General errors
  GEN_001: 'GEN_001', // Internal server error
  GEN_002: 'GEN_002', // Validation error
  GEN_003: 'GEN_003', // Resource not found
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
