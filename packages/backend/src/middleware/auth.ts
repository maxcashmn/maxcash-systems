// src/middleware/auth.ts

import type { MiddlewareHandler } from 'hono';

import { verifyJWT } from '../utils/jwt';
import { AppError } from '../errors/AppError';

import type { Env, AuthUser } from '../types';

function mapAuthUser(payload: any): AuthUser {
  return {
    sub: String(payload.sub),
    email: String(payload.email),
    role: String(payload.role),
  };
}

export const authMiddleware: MiddlewareHandler<Env> = async (
  c,
  next
) => {
  const authorization =
    c.req.header('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    throw AppError.unauthorized(
      'Authentication token is required.'
    );
  }

  const token =
    authorization.slice(7);

  try {
    const payload =
      await verifyJWT(token);

    const user =
      mapAuthUser(payload);

    c.set('user', user);
    c.set('userId', user.sub);

    await next();

  } catch {
    throw AppError.unauthorized(
      'Invalid or expired authentication token.'
    );
  }
};


export const optionalAuth: MiddlewareHandler<Env> = async (
  c,
  next
) => {
  const authorization =
    c.req.header('Authorization');

  if (authorization?.startsWith('Bearer ')) {
    try {
      const payload =
        await verifyJWT(
          authorization.slice(7)
        );

      const user =
        mapAuthUser(payload);

      c.set('user', user);
      c.set('userId', user.sub);

    } catch {
      // Ignore invalid token
    }
  }

  await next();
};




// // src/middleware/auth.ts

// import type { MiddlewareHandler } from 'hono';

// import { verifyJWT } from '../utils/jwt';
// import { AppError } from '../errors/AppError';

// import type { Env, AuthUser } from '../types';

// export const authMiddleware: MiddlewareHandler<Env> = async (
//   c,
//   next
// ) => {
//   const authorization = c.req.header('Authorization');

//   if (!authorization?.startsWith('Bearer ')) {
//     throw AppError.unauthorized(
//       'Authentication token is required.'
//     );
//   }

//   const token = authorization.slice(7);

//   try {
//     const payload = await verifyJWT(token);

//     const user: AuthUser = {
//       sub: String(payload.sub),
//       email: String(payload.email),
//       role: String(payload.role),
//     };

//     c.set('user', user);

//     await next();
//   } catch {
//     throw AppError.unauthorized(
//       'Invalid or expired authentication token.'
//     );
//   }
// };

// export const optionalAuth: MiddlewareHandler<Env> = async (
//   c,
//   next
// ) => {
//   const authorization = c.req.header('Authorization');

//   if (authorization?.startsWith('Bearer ')) {
//     try {
//       const payload = await verifyJWT(
//         authorization.slice(7)
//       );

//       const user: AuthUser = {
//         sub: String(payload.sub),
//         email: String(payload.email),
//         role: String(payload.role),
//       };

//       c.set('user', user);
//     } catch {
//       // Ignore invalid token
//     }
//   }

//   await next();
// };