/**
 * MaxCash Backend API
 * Cloudflare Workers with Hono framework
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middleware/errorHandler';
import v1Routes from './routes/v1';
import { initDb } from './db';

const app = new Hono();

// Middleware to initialize database for all requests
app.use('*', async (c, next) => {
  // @ts-ignore - env is available in Workers environment
  const env = c.env || {};
  // Initialize database
  initDb(env);
  await next();
});

app.use('*', logger());
app.use('*', cors());
app.use('*', errorHandler);

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'MaxCash Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Debug endpoint to check environment variables
app.get('/debug/env', (c) => {
  // @ts-ignore - env is available in Workers environment
  const env = c.env || {};
  const databaseUrl = env.DATABASE_URL || '';
  return c.json({
    hasDatabaseUrl: !!databaseUrl,
    databaseUrlPrefix: typeof databaseUrl === 'string' ? databaseUrl.substring(0, 20) + '...' : 'not set',
    nodeEnv: env.NODE_ENV || 'not set',
    hasJwtSecret: !!env.JWT_SECRET,
  });
});

// Test database connection
app.get('/debug/db', async (c) => {
  try {
    // @ts-ignore - env is available in Workers environment
    const env = c.env || {};
    const { query } = await import('./db');
    initDb(env);
    const result = await query('SELECT 1 as test, NOW() as time', [], env);
    return c.json({
      success: true,
      message: 'Database connection successful',
      result: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return c.json({
      success: false,
      message: 'Database connection failed',
      error: errorMessage,
    }, 500);
  }
});

app.route('/api/v1', v1Routes);

export default app;
// test: trigger build
// test: maxcashmn config
