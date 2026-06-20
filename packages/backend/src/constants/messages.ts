export const SuccessMessages = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  PASSWORD_RESET_SENT: 'Password reset email sent',
  PASSWORD_UPDATED: 'Password updated successfully',
  OTP_VERIFIED: 'OTP verified successfully',
  OTP_SENT: 'OTP sent successfully',

  // User
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  PROFILE_UPDATED: 'Profile updated successfully',

  // Loan
  LOAN_CREATED: 'Loan application submitted successfully',
  LOAN_UPDATED: 'Loan updated successfully',
  LOAN_APPROVED: 'Loan approved successfully',
  LOAN_REJECTED: 'Loan rejected',
  LOAN_DISBURSED: 'Loan disbursed successfully',
  LOAN_REPAID: 'Loan repaid successfully',

  // Transaction
  TRANSACTION_CREATED: 'Transaction created successfully',
  TRANSFER_SUCCESS: 'Transfer completed successfully',
  PAYMENT_SUCCESS: 'Payment successful',

  // Wallet
  WALLET_CREATED: 'Wallet created successfully',
  WALLET_UPDATED: 'Wallet updated successfully',
  WALLET_FUNDED: 'Wallet funded successfully',
  WITHDRAWAL_SUCCESS: 'Withdrawal successful',

  // General
  OPERATION_SUCCESS: 'Operation completed successfully',
  FETCH_SUCCESS: 'Data fetched successfully',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
} as const;

export const ErrorMessagesBackend = {
  // Auth
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  TOKEN_INVALID: 'Invalid token. Please login again.',
  TOKEN_EXPIRED: 'Token expired. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden. You do not have permission.',

  // User
  USER_NOT_FOUND: 'User not found.',
  USER_EXISTS: 'User already exists.',
  USER_INACTIVE: 'User account is inactive.',

  // Validation
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  INVALID_EMAIL: 'Invalid email address.',
  INVALID_PHONE: 'Invalid phone number.',
  INVALID_AMOUNT: 'Invalid amount.',
  PASSWORD_TOO_WEAK: 'Password is too weak. Must be at least 8 characters.',

  // General
  NOT_FOUND: 'Resource not found.',
  INTERNAL_ERROR: 'Internal server error. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service is currently unavailable. Please try again later.',
  BAD_REQUEST: 'Bad request. Please check your input.',
  DUPLICATE_ENTRY: 'Duplicate entry. This resource already exists.',

  // Database
  DB_CONNECTION_ERROR: 'Database connection error.',
  DB_QUERY_ERROR: 'Database query error.',
  DB_TRANSACTION_ERROR: 'Database transaction error.',
} as const;

export const HttpMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
} as const;

export type SuccessMessageKey = keyof typeof SuccessMessages;
export type ErrorMessageKey = keyof typeof ErrorMessagesBackend;
export type HttpMessageKey = keyof typeof HttpMessages;
