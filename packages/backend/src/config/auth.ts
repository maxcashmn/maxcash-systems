// src/config/auth.ts

import type { Bindings } from '../types';

export function getAuthConfig(
  env: Partial<Bindings> = {}
) {
  const getEnv = (
    key: keyof Bindings,
    fallback = ''
  ): string => {
    // Check Cloudflare Worker env bindings first
    if (env && env[key] !== undefined && env[key] !== null) {
      return String(env[key]);
    }
    // Check process.env for local/Node.js environments (safe check for Workers)
    if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
      return String(process.env[key]);
    }
    return String(fallback);
  };

  return {
    jwt: {
      secret: getEnv(
        'JWT_SECRET',
        'your-super-secret-jwt-key-change-in-production'
      ),

      expiresIn: getEnv(
        'JWT_EXPIRES_IN',
        '15m'
      ),

      algorithm: 'HS256' as const,
    },

    refreshToken: {
      secret: getEnv(
        'JWT_REFRESH_SECRET',
        'your-super-secret-refresh-key-change-in-production'
      ),

      expiresIn: getEnv(
        'JWT_REFRESH_EXPIRES_IN',
        '7d'
      ),
    },

    bcrypt: {
      saltRounds: 10,
    },

    session: {
      cookieName: 'maxcash_session',
      secure: false,
      httpOnly: true,
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  } as const;
}

export type AuthConfig =
  ReturnType<typeof getAuthConfig>;




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

// export const authConfig = {
//   jwt: {
//     secret: getEnv('JWT_SECRET') || 'your-super-secret-jwt-key-change-in-production',
//     expiresIn: getEnv('JWT_EXPIRES_IN') || '15m',
//     algorithm: 'HS256' as const,
//   },
//   refreshToken: {
//     secret: getEnv('JWT_REFRESH_SECRET') || 'your-super-secret-refresh-key-change-in-production',
//     expiresIn: getEnv('JWT_REFRESH_EXPIRES_IN') || '7d',
//   },
//   bcrypt: {
//     saltRounds: 10,
//   },
//   session: {
//     cookieName: 'maxcash_session',
//     secure: false,
//     httpOnly: true,
//     sameSite: 'lax' as const,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   },
// } as const;

// export type AuthConfig = typeof authConfig;
