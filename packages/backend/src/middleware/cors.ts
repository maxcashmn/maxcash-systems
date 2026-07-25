// src/middleware/cors.ts

import type { MiddlewareHandler } from 'hono';
import { getAppConfig } from '../config';

export const corsMiddleware: MiddlewareHandler = async (
  c,
  next
) => {
  const origin = c.req.header('Origin') ?? '';
  const appConfig = getAppConfig(c.env);
  const allowedOrigins = appConfig.cors.allowedOrigins;

  // Debug logging
  console.log('CORS Debug:');
  console.log('  Method:', c.req.method);
  console.log('  Origin:', origin);
  console.log('  Allowed Origins:', allowedOrigins);

  // Check if origin is allowed - handle '*' properly
  const isAllowed = allowedOrigins.includes('*') || allowedOrigins.includes(origin);
  
  // ALWAYS set CORS headers for both OPTIONS and other requests
  if (isAllowed) {
    c.header('Access-Control-Allow-Origin', origin || '*');
    c.header('Access-Control-Allow-Credentials', 'true');
    c.header('Access-Control-Allow-Methods', appConfig.cors.allowedMethods.join(', '));
    c.header('Access-Control-Allow-Headers', appConfig.cors.allowedHeaders.join(', '));
    c.header('Access-Control-Expose-Headers', 'Content-Length, X-Request-Id');
  } else {
    console.log('  Origin NOT allowed:', origin);
  }

  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    c.header('Access-Control-Max-Age', '86400');
    return c.body(null, 204);
  }

  await next();
};


// // src/middleware/cors.ts

// import type { MiddlewareHandler } from 'hono';
// import { getAppConfig } from '../config';

// export const corsMiddleware: MiddlewareHandler = async (
//   c,
//   next
// ) => {
//   const origin = c.req.header('Origin') ?? '';
//   const appConfig = getAppConfig(c.env);
//   const allowedOrigins = appConfig.cors.allowedOrigins;

//   // Debug logging
//   console.log('CORS Debug:');
//   console.log('  Method:', c.req.method);
//   console.log('  Origin:', origin);
//   console.log('  Allowed Origins:', allowedOrigins);

//   // Check if origin is allowed
//   const isAllowed = allowedOrigins.includes(origin) || allowedOrigins.includes('*');
  
//   // ALWAYS set CORS headers for both OPTIONS and other requests
//   if (isAllowed) {
//     c.header('Access-Control-Allow-Origin', origin);
//     c.header('Access-Control-Allow-Credentials', 'true');
//     c.header('Access-Control-Allow-Methods', appConfig.cors.allowedMethods.join(', '));
//     c.header('Access-Control-Allow-Headers', appConfig.cors.allowedHeaders.join(', '));
//     c.header('Access-Control-Expose-Headers', 'Content-Length, X-Request-Id');
//   } else {
//     console.log('  Origin NOT allowed:', origin);
//     // Even if not allowed, set the header for debugging
//     c.header('Access-Control-Allow-Origin', origin);
//   }

//   // Handle preflight requests
//   if (c.req.method === 'OPTIONS') {
//     c.header('Access-Control-Max-Age', '86400');
//     return c.body(null, 204);
//   }

//   await next();
// };
