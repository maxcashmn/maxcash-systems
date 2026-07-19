// src/middleware/errorHandler.ts

import type { MiddlewareHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { AppError } from '../errors/AppError';
import { ErrorMessagesBackend } from '../constants';

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();

  } catch (error) {
    console.error('API Error:', {
      method: c.req.method,
      path: c.req.path,
      error,
    });

    // ===============================
    // Operational Application Errors
    // ===============================

    if (error instanceof AppError) {
      return c.json(
        {
          success: false,
          message: error.message,
          code: error.code,
          details: error.isOperational
            ? error.details
            : undefined,
          timestamp: new Date().toISOString(),
          statusCode: error.statusCode,
        },
        error.statusCode as ContentfulStatusCode
      );
    }

    // ===============================
    // Unknown Errors
    // ===============================

    if (error instanceof Error) {
      return c.json(
        {
          success: false,
          message:
            c.env.NODE_ENV === 'production'
              ? ErrorMessagesBackend.INTERNAL_ERROR
              : error.message,
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
  }
};


// // src/middleware/errorHandler.ts

// import type { MiddlewareHandler } from 'hono';
// import type { ContentfulStatusCode } from 'hono/utils/http-status';

// import { AppError } from '../errors/AppError';
// import { ErrorMessagesBackend } from '../constants';

// export const errorHandler: MiddlewareHandler = async (
//   c,
//   next
// ) => {
//   try {
//     await next();
//   } catch (error) {
//     console.error(
//       'Error caught by error handler:',
//       error
//     );

//     if (error instanceof AppError) {
//       return c.json(
//         {
//           success: false,
//           message: error.message,
//           code: error.code,
//           details: error.details,
//           timestamp: new Date().toISOString(),
//           statusCode: error.statusCode,
//         },
//         error.statusCode as ContentfulStatusCode
//       );
//     }

//     if (error instanceof Error) {
//       return c.json(
//         {
//           success: false,
//           message:
//             error.message ||
//             ErrorMessagesBackend.INTERNAL_ERROR,
//           timestamp:
//             new Date().toISOString(),
//           statusCode: 500,
//         },
//         500
//       );
//     }

//     return c.json(
//       {
//         success: false,
//         message:
//           ErrorMessagesBackend.INTERNAL_ERROR,
//         timestamp:
//           new Date().toISOString(),
//         statusCode: 500,
//       },
//       500
//     );
//   }
// };



// import { Context, Next } from 'hono';
// import { AppError } from '../errors/AppError';
// import { ErrorMessagesBackend } from '../constants';

// export async function errorHandler(c: Context, next: Next) {
//   try {
//     await next();
//   } catch (error) {
//     console.error('Error caught by error handler:', error);
    
//     if (error instanceof AppError) {
//       return c.json({
//         success: false,
//         message: error.message,
//         code: error.code,
//         details: error.details,
//         timestamp: new Date().toISOString(),
//         statusCode: error.statusCode,
//       }, error.statusCode);
//     }
    
//     if (error instanceof Error) {
//       return c.json({
//         success: false,
//         message: error.message || ErrorMessagesBackend.INTERNAL_ERROR,
//         timestamp: new Date().toISOString(),
//         statusCode: 500,
//       }, 500);
//     }
    
//     return c.json({
//       success: false,
//       message: ErrorMessagesBackend.INTERNAL_ERROR,
//       timestamp: new Date().toISOString(),
//       statusCode: 500,
//     }, 500);
//   }
// }
