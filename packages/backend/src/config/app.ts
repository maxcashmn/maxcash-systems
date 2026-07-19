// src/config/app.ts

import type { Bindings } from '../types';

export function getAppConfig(
  env: Partial<Bindings> = {}
) {
  const getEnv = (
    key: keyof Bindings,
    fallback = ''
  ): string =>
    String(env[key] ?? process.env[key] ?? fallback);

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
      allowedOrigins:
        getEnv('CORS_ORIGINS')
          ? getEnv('CORS_ORIGINS')
              .split(',')
              .map(origin => origin.trim())
          : [
              'http://localhost:5173',
              'http://localhost:3000',
            ],

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



// // src/config/app.ts

// import type { Bindings } from '../types';

// function getEnv(
//   key: keyof Bindings,
//   env?: Partial<Bindings>
// ): string {
//   if (env?.[key]) {
//     return String(env[key]);
//   }

//   if (typeof process !== 'undefined') {
//     return process.env[key] ?? '';
//   }

//   return '';
// }


// export const appConfig = {
//   name: 'MaxCash Backend API',

//   version: '1.0.0',

//   environment:
//     getEnv('NODE_ENV') || 'development',

//   port: Number(
//     getEnv('PORT') || 8787
//   ),

//   apiPrefix: '/api/v1',

//   cors: {
//     allowedOrigins:
//       getEnv('CORS_ORIGINS')
//         ? getEnv('CORS_ORIGINS')
//             .split(',')
//             .map(origin => origin.trim())
//         : [
//             'http://localhost:5173',
//             'http://localhost:3000',
//           ],

//     allowedMethods: [
//       'GET',
//       'POST',
//       'PUT',
//       'PATCH',
//       'DELETE',
//       'OPTIONS',
//     ],

//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'X-Requested-With',
//     ],

//     credentials: true,
//   },
// } as const;


// export type AppConfig =
//   typeof appConfig;