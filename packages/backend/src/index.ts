// src/index.ts

/**
 * MaxCash Backend API
 * Cloudflare Workers + Hono
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { initDb, query } from './db';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import { requireRole } from './middleware/rbac';
import v1Routes from './routes/v1';

import type {
  Bindings,
  Variables,
} from './types';

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// =====================================
// Global Logger
// =====================================

app.use(
  '*',
  logger()
);


// =====================================
// CORS Configuration
// =====================================

app.use(
  '*',
  cors({

    origin: [
      'http://localhost:5173',
      // Add production frontend URL here
      // 'https://app.maxcash.com',
    ],

    allowMethods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowHeaders: [
      'Content-Type',
      'Authorization',
    ],

    credentials: true,

  })
);

// =====================================
// Database Initialization
// =====================================

app.use(
  '*',
  async (c, next) => {

    initDb(
      c.env
    );

    await next();

  }
);


// =====================================
// Global Error Handler
// =====================================

app.use(
  '*',
  errorHandler
);


// =====================================
// Health Endpoint
// =====================================

app.get(
  '/',
  (c) => {

    return c.json({

      success: true,

      data: {

        name:
          'MaxCash Backend API',

        version:
          '1.0.0',

        status:
          'ok',

        timestamp:
          new Date().toISOString(),

      },

    });

  }
);



app.get(
  '/health',
  (c) => {

    return c.json({

      success: true,

      data: {

        status:
          'healthy',

        timestamp:
          new Date().toISOString(),

      },

    });

  }
);


// =====================================
// Environment Debug
// Admin Only
// =====================================

app.get(
  '/debug/env',
  authMiddleware,
  requireRole('admin'),
  (c) => {

    const {
      DATABASE_URL,
      NODE_ENV,
      JWT_SECRET,

    } = c.env;


    return c.json({

      success: true,

      data: {

        hasDatabaseUrl:
          Boolean(DATABASE_URL),


        databaseUrlPrefix:
          DATABASE_URL
            ? `${DATABASE_URL.substring(0, 20)}...`
            : null,


        nodeEnv:
          NODE_ENV,


        hasJwtSecret:
          Boolean(JWT_SECRET),

      },

    });

  }
);


// =====================================
// Database Debug
// Admin Only
// =====================================

app.get(
  '/debug/db',
  authMiddleware,
  requireRole('admin'),
  async (c) => {

    try {

      const result =
        await query(
          `
          SELECT
            1 AS test,
            NOW() AS current_time
          `,
          [],
          c.env
        );


      return c.json({

        success:
          true,

        message:
          'Database connection successful.',

        data:
          result,

      });


    } catch (error) {

      return c.json(

        {

          success:
            false,

          message:
            'Database connection failed.',


          error:
            error instanceof Error
              ? error.message
              : String(error),

        },

        500

      );

    }

  }
);


// =====================================
// API Routes
// =====================================

app.route(
  '/api/v1',
  v1Routes
);

export default app;



// /**
//  * MaxCash Backend API
//  * Cloudflare Workers + Hono
//  */

// import { Hono } from 'hono';
// import { cors } from 'hono/cors';
// import { logger } from 'hono/logger';

// import { initDb, query } from './db';
// import { errorHandler } from './middleware/errorHandler';
// import v1Routes from './routes/v1';

// import type {
//   Bindings,
//   Variables,
// } from './types';


// const app = new Hono<{
//   Bindings: Bindings;
//   Variables: Variables;
// }>();


// // =====================================
// // Database Initialization
// // =====================================

// app.use('*', async (c, next) => {

//   initDb(c.env);

//   await next();

// });


// // =====================================
// // Global Middleware
// // =====================================

// app.use('*', logger());

// app.use(
//   '*',
//   cors({
//     origin: '*',

//     allowMethods: [
//       'GET',
//       'POST',
//       'PUT',
//       'PATCH',
//       'DELETE',
//       'OPTIONS',
//     ],

//     allowHeaders: [
//       'Content-Type',
//       'Authorization',
//     ],

//     credentials: true,
//   })
// );


// app.use(
//   '*',
//   errorHandler
// );


// // =====================================
// // Health Endpoints
// // =====================================

// app.get('/', (c) => {

//   return c.json({
//     success: true,

//     data: {
//       name:
//         'MaxCash Backend API',

//       version:
//         '1.0.0',

//       status:
//         'ok',

//       timestamp:
//         new Date().toISOString(),
//     },
//   });

// });


// app.get('/health', (c) => {

//   return c.json({
//     success: true,

//     data: {
//       status:
//         'healthy',

//       timestamp:
//         new Date().toISOString(),
//     },
//   });

// });


// // =====================================
// // Environment Debug
// // =====================================

// app.get('/debug/env', (c) => {

//   const {
//     DATABASE_URL,
//     NODE_ENV,
//     JWT_SECRET,
//   } = c.env;


//   return c.json({
//     success: true,

//     data: {

//       hasDatabaseUrl:
//         Boolean(DATABASE_URL),

//       databaseUrlPrefix:
//         DATABASE_URL
//           ? `${DATABASE_URL.substring(0, 20)}...`
//           : null,

//       nodeEnv:
//         NODE_ENV,

//       hasJwtSecret:
//         Boolean(JWT_SECRET),

//     },
//   });

// });


// // =====================================
// // Database Debug
// // =====================================

// app.get(
//   '/debug/db',
//   async (c) => {

//     try {

//       const result =
//         await query(
//           `
//           SELECT
//             1 AS test,
//             NOW() AS current_time
//           `,
//           [],
//           c.env
//         );


//       return c.json({

//         success:
//           true,

//         message:
//           'Database connection successful.',

//         data:
//           result,

//       });


//     } catch(error) {

//       return c.json(
//         {
//           success:
//             false,

//           message:
//             'Database connection failed.',

//           error:
//             error instanceof Error
//               ? error.message
//               : String(error),

//         },
//         500
//       );

//     }

//   }
// );


// // =====================================
// // API Routes
// // =====================================

// app.route(
//   '/api/v1',
//   v1Routes
// );


// export default app;



// /**
//  * MaxCash Backend API
//  * Cloudflare Workers + Hono
//  */

// import { Hono } from 'hono';
// import { cors } from 'hono/cors';
// import { logger } from 'hono/logger';

// import { initDb, query } from './db';
// import { errorHandler } from './middleware/errorHandler';
// import v1Routes from './routes/v1';

// import type { Env } from './types';

// const app = new Hono<Env>();

// // =====================================
// // Database Initialization
// // =====================================

// app.use('*', async (c, next) => {
//   initDb(c.env);
//   await next();
// });

// // =====================================
// // Global Middleware
// // =====================================

// app.use('*', logger());

// app.use(
//   '*',
//   cors({
//     origin: '*',
//     allowMethods: [
//       'GET',
//       'POST',
//       'PUT',
//       'PATCH',
//       'DELETE',
//       'OPTIONS',
//     ],
//     allowHeaders: [
//       'Content-Type',
//       'Authorization',
//     ],
//   })
// );

// app.use('*', errorHandler);

// // =====================================
// // Health Endpoints
// // =====================================

// app.get('/', (c) => {
//   return c.json({
//     success: true,
//     data: {
//       name: 'MaxCash Backend API',
//       version: '1.0.0',
//       status: 'ok',
//       timestamp: new Date().toISOString(),
//     },
//   });
// });

// app.get('/health', (c) => {
//   return c.json({
//     success: true,
//     data: {
//       status: 'healthy',
//       timestamp: new Date().toISOString(),
//     },
//   });
// });

// // =====================================
// // Environment Debug
// // =====================================

// app.get('/debug/env', (c) => {
//   const { DATABASE_URL, NODE_ENV, JWT_SECRET } = c.env;

//   return c.json({
//     success: true,
//     data: {
//       hasDatabaseUrl: Boolean(DATABASE_URL),
//       databaseUrlPrefix: DATABASE_URL
//         ? `${DATABASE_URL.substring(0, 20)}...`
//         : null,
//       nodeEnv: NODE_ENV,
//       hasJwtSecret: Boolean(JWT_SECRET),
//     },
//   });
// });

// // =====================================
// // Database Debug
// // =====================================

// app.get('/debug/db', async (c) => {
//   try {
//     const result = await query(
//       `
//       SELECT
//         1 AS test,
//         NOW() AS current_time
//       `,
//       [],
//       c.env
//     );

//     return c.json({
//       success: true,
//       message: 'Database connection successful.',
//       data: result,
//     });
//   } catch (error) {
//     return c.json(
//       {
//         success: false,
//         message: 'Database connection failed.',
//         error:
//           error instanceof Error
//             ? error.message
//             : String(error),
//       },
//       500
//     );
//   }
// });

// // =====================================
// // API Routes
// // =====================================

// app.route('/api/v1', v1Routes);

// export default app;