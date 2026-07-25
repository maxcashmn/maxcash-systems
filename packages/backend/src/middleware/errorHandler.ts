// src/middleware/errorHandler.ts

import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { AppError } from '../errors/AppError';
import { ErrorMessagesBackend } from '../constants';

export const errorHandler: ErrorHandler = async (err, c) => {
  console.error('API Error:', {
    method: c.req.method,
    path: c.req.path,
    error: err,
  });

  // ===============================
  // Operational Application Errors
  // ===============================

  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        message: err.message,
        code: err.code,
        details: err.isOperational
          ? err.details
          : undefined,
        timestamp: new Date().toISOString(),
        statusCode: err.statusCode,
      },
      err.statusCode as ContentfulStatusCode
    );
  }

  // ===============================
  // Unknown Errors
  // ===============================

  if (err instanceof Error) {
    const isProduction =
      typeof c.env !== 'undefined' &&
      c.env !== null &&
      c.env.NODE_ENV === 'production';

    return c.json(
      {
        success: false,
        message: isProduction
          ? ErrorMessagesBackend.INTERNAL_ERROR
          : err.message,
        timestamp: new Date().toISOString(),
        statusCode: 500,
      },
      500
    );
  }

  // ===============================
  // Non Error Objects
  // ===============================

  return c.json(
    {
      success: false,
      message: ErrorMessagesBackend.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
      statusCode: 500,
    },
    500
  );
};