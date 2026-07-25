// src/config/database.ts

import type { Bindings } from '../types';

export function getDatabaseConfig(
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

  const getEnvNumber = (
    key: keyof Bindings,
    fallback: number
  ): number => {
    const val = getEnv(key, String(fallback));
    return Number(val);
  };

  return {
    url: getEnv('DATABASE_URL'),

    pool: {
      max: getEnvNumber('DB_POOL_MAX', 10),

      idleTimeout: getEnvNumber('DB_IDLE_TIMEOUT', 30000),

      connectionTimeout: getEnvNumber('DB_CONNECTION_TIMEOUT', 10000),
    },

    ssl: {
      require: true,
      rejectUnauthorized: false,
    },

    migrations: {
      table: 'migrations',
      directory: './sql/migrations',
    },
  } as const;
}

export type DatabaseConfig =
  ReturnType<typeof getDatabaseConfig>;



// import type { Bindings } from '../types';

// function getEnv(key: keyof Bindings): string {
//   if (typeof process !== 'undefined') {
//     return process.env[key] ?? '';
//   }

//   return '';
// }

// export const databaseConfig = {
//   url: getEnv('DATABASE_URL'),

//   pool: {
//     max: Number(getEnv('DB_POOL_MAX') || 10),
//     idleTimeout: Number(getEnv('DB_IDLE_TIMEOUT') || 30000),
//     connectionTimeout: Number(getEnv('DB_CONNECTION_TIMEOUT') || 10000),
//   },

//   ssl: {
//     require: true,
//     rejectUnauthorized: false,
//   },

//   migrations: {
//     table: 'migrations',
//     directory: './sql/migrations',
//   },
// } as const;

// export type DatabaseConfig = typeof databaseConfig;



// // In Cloudflare Workers, environment variables are directly available via `env`
// // @ts-ignore - env is available in Workers environment
// const getEnv = (key: string): string => {
//   // @ts-ignore - env is available in Workers environment
//   if (typeof env !== 'undefined' && env[key]) {
//     // @ts-ignore - env is available in Workers environment
//     return env[key];
//   }
//   // Fallback for local development with process.env
//   // @ts-ignore - process is available in Node.js environment
//   if (typeof process !== 'undefined' && process.env && process.env[key]) {
//     // @ts-ignore - process is available in Node.js environment
//     return process.env[key] as string;
//   }
//   return '';
// };

// export const databaseConfig = {
//   url: getEnv('DATABASE_URL'),
//   pool: {
//     max: parseInt(getEnv('DB_POOL_MAX') || '10'),
//     idleTimeout: parseInt(getEnv('DB_IDLE_TIMEOUT') || '30000'),
//     connectionTimeout: parseInt(getEnv('DB_CONNECTION_TIMEOUT') || '10000'),
//   },
//   ssl: {
//     require: true,
//     rejectUnauthorized: false,
//   },
//   migrations: {
//     table: 'migrations',
//     directory: './sql/migrations',
//   },
// } as const;

// export type DatabaseConfig = typeof databaseConfig;
