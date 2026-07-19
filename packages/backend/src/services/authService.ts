import { hashPassword, comparePassword } from '../utils/hash';
import {
  signJWT,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';
import { UserRepository } from '../repositories/userRepository';
import { RefreshTokenRepository } from '../repositories/refreshTokenRepository';
import { AppError } from '../errors/AppError';
import { generateId } from '../utils/helpers';
import { emailService } from './emailService';

const userRepo = new UserRepository();
const refreshTokenRepo = new RefreshTokenRepository();

const VALID_ROLES = [
  'borrower',
  'manager',
  'auditor',
  'admin',
] as const;

type UserRole = typeof VALID_ROLES[number];

const REFRESH_TOKEN_DAYS = 7;
const VERIFICATION_TOKEN_HOURS = 24;


interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: UserRole;
}


function getRefreshTokenExpiry(): Date {
  return new Date(
    Date.now() +
    REFRESH_TOKEN_DAYS *
    24 *
    60 *
    60 *
    1000
  );
}


function getVerificationExpiry(): Date {
  return new Date(
    Date.now() +
    VERIFICATION_TOKEN_HOURS *
    60 *
    60 *
    1000
  );
}


function normalizeRole(
  role?: string
): UserRole {
  return role &&
    VALID_ROLES.includes(role as UserRole)
    ? role as UserRole
    : 'borrower';
}


// ===============================
// Register User
// ===============================

export async function registerUser(
  env: Record<string, string | undefined>,
  data: RegisterData
) {

  const email =
    data.email.toLowerCase().trim();


  const existingUser =
    await userRepo.findByEmail(email);


  if (existingUser) {
    throw AppError.conflict(
      'Email already registered'
    );
  }


  if (data.password.length < 8) {
    throw AppError.badRequest(
      'Password must be at least 8 characters'
    );
  }


  const passwordHash =
    await hashPassword(
      data.password
    );


  const verificationToken =
    crypto.randomUUID();


  const user =
    await userRepo.create({

      email,

      firstName:
        data.firstName.trim(),

      lastName:
        data.lastName.trim(),

      phoneNumber:
        data.phoneNumber ?? null,

      password_hash:
        passwordHash,

      role:
        normalizeRole(data.role),

      status:
        'pending',

      email_verified:
        false,

      phone_verified:
        false,

      email_verification_token:
        verificationToken,

      email_verification_expires:
        getVerificationExpiry(),
    });


  await emailService.sendVerificationEmail(
    env,
    {
      email: user.email,
      name:
        `${user.firstName} ${user.lastName}`,
      token: verificationToken,
    }
  );


  return {
    message:
      'Registration successful. Verify your email.',
    user,
  };
}


// ===============================
// Verify Email
// ===============================

export async function verifyEmail(
  env: Record<string, string | undefined>,
  token: string
) {

  const user =
    await userRepo.findByVerificationToken(
      token
    );


  if (!user) {
    throw AppError.badRequest(
      'Invalid or expired verification token'
    );
  }


  await userRepo.verifyEmail(
    user.id
  );


  await emailService.sendWelcomeEmail(
    env,
    {
      email: user.email,
      name:
        `${user.first_name} ${user.last_name}`,
    }
  );


  return {
    message:
      'Email verified successfully',
  };
}


// ===============================
// Resend Verification Email
// ===============================

export async function resendVerificationEmail(
  env: Record<string, string | undefined>,
  email: string
) {

  const user =
    await userRepo.findByEmail(email);


  if (!user) {
    throw AppError.notFound(
      'User not found'
    );
  }


  if (user.emailVerified) {
    throw AppError.badRequest(
      'Email already verified'
    );
  }


  const token =
    crypto.randomUUID();


  await userRepo.setVerificationToken(
    user.id,
    token,
    getVerificationExpiry()
  );


  await emailService.sendVerificationEmail(
    env,
    {
      email: user.email,
      name:
        `${user.firstName} ${user.lastName}`,
      token,
    }
  );


  return {
    message:
      'Verification email sent',
  };
}


// ===============================
// Login
// ===============================

export async function loginUser(
  email: string,
  password: string
) {

  const user =
    await userRepo.getUserWithPassword(
      email
    );


  if (!user) {
    throw AppError.unauthorized(
      'Invalid email or password'
    );
  }


  const valid =
    await comparePassword(
      password,
      user.password_hash
    );


  if (!valid) {
    throw AppError.unauthorized(
      'Invalid email or password'
    );
  }


  if (!user.email_verified) {
    throw AppError.forbidden(
      'Please verify your email first'
    );
  }


  if (user.status !== 'active') {
    throw AppError.forbidden(
      'Account is not active'
    );
  }


  return createAuthTokens(user);
}


// ===============================
// Token Generator
// ===============================

async function createAuthTokens(
  user: {
    id: string;
    email: string;
    role: string;
    first_name?: string;
    last_name?: string;
    status?: string;
  }
) {

  const token =
    await signJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    });


  const refreshToken =
    await signRefreshToken({
      sub: user.id,
    });


  await refreshTokenRepo.create({
    id: generateId(),
    user_id: user.id,
    token: refreshToken,
    expires_at:
      getRefreshTokenExpiry(),
    revoked: false,
  });


  return {
    user: {
      id: user.id,
      email: user.email,
      firstName:
        user.first_name,
      lastName:
        user.last_name,
      role:
        user.role,
      status:
        user.status,
    },
    token,
    refreshToken,
  };
}


// ===============================
// Refresh Token
// ===============================

export async function refreshToken(
  token: string
) {

  const payload =
    await verifyRefreshToken(token);


  const userId =
    String(payload.sub);


  const stored =
    await refreshTokenRepo.findByToken(
      token
    );


  if (!stored || stored.revoked) {
    throw AppError.unauthorized(
      'Invalid refresh token'
    );
  }


  const user =
    await userRepo.findById(
      userId
    );


  if (!user) {
    throw AppError.unauthorized(
      'User not found'
    );
  }


  await refreshTokenRepo.revokeToken(
    token
  );


  return createAuthTokens(user);
}


// ===============================
// Logout
// ===============================

export async function logoutUser(
  userId: string
) {

  await refreshTokenRepo.revokeAllUserTokens(
    userId
  );


  return {
    success: true,
  };
}


// ===============================
// Change Password
// ===============================

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {

  if (newPassword.length < 8) {
    throw AppError.badRequest(
      'Password must be at least 8 characters'
    );
  }


  const user =
    await userRepo.getUserWithPasswordById(
      userId
    );


  if (!user) {
    throw AppError.notFound(
      'User not found'
    );
  }


  const valid =
    await comparePassword(
      currentPassword,
      user.password_hash
    );


  if (!valid) {
    throw AppError.unauthorized(
      'Current password incorrect'
    );
  }


  const passwordHash =
    await hashPassword(
      newPassword
    );


  await userRepo.updatePassword(
    userId,
    passwordHash
  );


  await refreshTokenRepo.revokeAllUserTokens(
    userId
  );


  return {
    success: true,
  };
}