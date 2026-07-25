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
// Global Error Handler (MUST be first)
// =====================================

app.onError(errorHandler);

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
    origin: (origin) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:3000',
        'https://maxcash-systems.pages.dev',
        'https://d91783bf.maxcash-systems.pages.dev',
      ];
      
      // Allow all origins for testing
      if (!origin) return '*';
      
      // Check if origin is allowed
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      
      // Default: allow localhost for development
      return 'http://localhost:5173';
    },
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
      'X-Requested-With',
    ],
    exposeHeaders: ['Content-Length', 'X-Request-Id'],
    maxAge: 86400,
    credentials: true,
  })
);

// =====================================
// Database Initialization
// =====================================

app.use(
  '*',
  async (c, next) => {

    try {
      initDb(c.env);
    } catch (err) {
      console.error('Database initialization failed:', err);
      // Don't throw - let the route handlers handle DB errors gracefully
    }

    await next();

  }
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