/**
 * MaxCash Backend API
 * Cloudflare Workers with Hono framework
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { errorHandler } from './middleware/errorHandler';
import v1Routes from './routes/v1';

// Initialize Hono app
const app = new Hono();

// Global middleware
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

// Mount API routes
app.route('/api/v1', v1Routes);

// Export the app for Cloudflare Workers
export default app;
