import { ErrorCodes, ErrorMessages } from '../constants';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = ErrorCodes.GEN_001,
    isOperational: boolean = true,
    details?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message?: string, details?: Record<string, any>): AppError {
    return new AppError(
      message || ErrorMessages[ErrorCodes.GEN_002],
      400,
      ErrorCodes.GEN_002,
      true,
      details
    );
  }

  static unauthorized(message?: string): AppError {
    return new AppError(
      message || ErrorMessages[ErrorCodes.AUTH_004],
      401,
      ErrorCodes.AUTH_004,
      true
    );
  }

  static forbidden(message?: string): AppError {
    return new AppError(
      message || 'Forbidden',
      403,
      ErrorCodes.AUTH_004,
      true
    );
  }

  static notFound(message?: string): AppError {
    return new AppError(
      message || ErrorMessages[ErrorCodes.GEN_003],
      404,
      ErrorCodes.GEN_003,
      true
    );
  }

  static conflict(message?: string): AppError {
    return new AppError(
      message || 'Resource already exists',
      409,
      ErrorCodes.GEN_002,
      true
    );
  }

  static validation(message?: string, details?: Record<string, any>): AppError {
    return new AppError(
      message || ErrorMessages[ErrorCodes.GEN_002],
      422,
      ErrorCodes.GEN_002,
      true,
      details
    );
  }

  static internal(message?: string): AppError {
    return new AppError(
      message || ErrorMessages[ErrorCodes.GEN_001],
      500,
      ErrorCodes.GEN_001,
      false
    );
  }
}
