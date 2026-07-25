// src/config/app.ts

import type { Bindings } from '../types';

export function getAppConfig(
  env: Partial<Bindings> = {}
) {
  const getEnv = (
    key: keyof Bindings,
    fallback = ''
  ): string => {
    if (env && env[key] !== undefined && env[key] !== null) {
      return String(env[key]);
    }
    if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
      return String(process.env[key]);
    }
    return String(fallback);
  };

  return {
    name: 'MaxCash Backend API',

    version: '1.0.0',

    environment:
      getEnv('NODE_ENV', 'development'),

    port: Number(
      getEnv('PORT', '8787')
    ),

    apiPrefix: '/api/v1',

    cors: {
      allowedOrigins: ['*'] as string[],  // ✅ Fix the type
      
      allowedMethods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
      ],

      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
      ],

      credentials: true,
    },
  } as const;
}

export type AppConfig =
  ReturnType<typeof getAppConfig>;