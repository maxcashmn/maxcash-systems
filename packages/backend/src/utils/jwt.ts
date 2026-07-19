import { SignJWT, jwtVerify, JWTPayload } from 'jose';

import { getAuthConfig } from '../config';

function getSecrets() {
  const authConfig = getAuthConfig();

  return {
    authConfig,
    secret: new TextEncoder().encode(
      authConfig.jwt.secret
    ),
    refreshSecret: new TextEncoder().encode(
      authConfig.refreshToken.secret
    ),
  };
}

export async function signJWT(
  payload: JWTPayload,
  expiresIn?: string
): Promise<string> {
  const { authConfig, secret } = getSecrets();

  return new SignJWT(payload)
    .setProtectedHeader({
      alg: authConfig.jwt.algorithm,
    })
    .setIssuedAt()
    .setExpirationTime(
      expiresIn ?? authConfig.jwt.expiresIn
    )
    .sign(secret);
}

export async function verifyJWT(
  token: string
): Promise<JWTPayload> {
  try {
    const { secret } = getSecrets();

    const { payload } = await jwtVerify(
      token,
      secret
    );

    return payload;
  } catch {
    throw new Error(
      'Invalid or expired token'
    );
  }
}

export async function signRefreshToken(
  payload: JWTPayload,
  expiresIn?: string
): Promise<string> {
  const { authConfig, refreshSecret } = getSecrets();

  return new SignJWT(payload)
    .setProtectedHeader({
      alg: authConfig.jwt.algorithm,
    })
    .setIssuedAt()
    .setExpirationTime(
      expiresIn ?? authConfig.refreshToken.expiresIn
    )
    .sign(refreshSecret);
}

export async function verifyRefreshToken(
  token: string
): Promise<JWTPayload> {
  try {
    const { refreshSecret } = getSecrets();

    const { payload } = await jwtVerify(
      token,
      refreshSecret
    );

    return payload;
  } catch {
    throw new Error(
      'Invalid or expired refresh token'
    );
  }
}


// import { SignJWT, jwtVerify, JWTPayload } from 'jose';
// import { authConfig } from '../config';

// const secret = new TextEncoder().encode(authConfig.jwt.secret);
// const refreshSecret = new TextEncoder().encode(authConfig.refreshToken.secret);

// export async function signJWT(
//   payload: JWTPayload,
//   expiresIn: string = authConfig.jwt.expiresIn
// ): Promise<string> {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: authConfig.jwt.algorithm })
//     .setIssuedAt()
//     .setExpirationTime(expiresIn)
//     .sign(secret);
// }

// export async function verifyJWT(token: string): Promise<JWTPayload> {
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// }

// export async function signRefreshToken(
//   payload: JWTPayload,
//   expiresIn: string = authConfig.refreshToken.expiresIn
// ): Promise<string> {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: authConfig.jwt.algorithm })
//     .setIssuedAt()
//     .setExpirationTime(expiresIn)
//     .sign(refreshSecret);
// }

// export async function verifyRefreshToken(token: string): Promise<JWTPayload> {
//   try {
//     const { payload } = await jwtVerify(token, refreshSecret);
//     return payload;
//   } catch (error) {
//     throw new Error('Invalid or expired refresh token');
//   }
// }
