import { Context, Next } from 'hono';
import { AppError } from '../errors/AppError';
import { ErrorMessagesBackend } from '../constants';

export async function errorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    console.error('Error caught by error handler:', error);
    
    if (error instanceof AppError) {
      return c.json({
        success: false,
        message: error.message,
        code: error.code,
        details: error.details,
        timestamp: new Date().toISOString(),
        statusCode: error.statusCode,
      }, error.statusCode);
    }
    
    if (error instanceof Error) {
      return c.json({
        success: false,
        message: error.message || ErrorMessagesBackend.INTERNAL_ERROR,
        timestamp: new Date().toISOString(),
        statusCode: 500,
      }, 500);
    }
    
    return c.json({
      success: false,
      message: ErrorMessagesBackend.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
      statusCode: 500,
    }, 500);
  }
}
