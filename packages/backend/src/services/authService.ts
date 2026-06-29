import { hashPassword, comparePassword } from '../utils/hash';
import { signJWT, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { UserRepository } from '../repositories/userRepository';
import { RefreshTokenRepository } from '../repositories/refreshTokenRepository';
import { AppError } from '../errors/AppError';
import { generateId } from '../utils/helpers';

const userRepo = new UserRepository();
const refreshTokenRepo = new RefreshTokenRepository();

// Valid roles
const VALID_ROLES = ['borrower', 'manager', 'auditor', 'admin'] as const;
type UserRole = typeof VALID_ROLES[number];

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: string;
}) {
  console.log('🟢 registerUser called with email:', data.email);
  console.log('👤 Role provided:', data.role || 'defaulting to borrower');
  
  try {
    // Validate email format
    if (!data.email || !data.email.includes('@')) {
      throw AppError.badRequest('Invalid email format');
    }

    // Validate password strength
    if (data.password.length < 8) {
      throw AppError.badRequest('Password must be at least 8 characters');
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) {
      console.log('⚠️ User already exists:', data.email);
      throw AppError.conflict('User with this email already exists');
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await hashPassword(data.password);
    console.log('✅ Password hashed successfully');

    // Validate and set role
    let userRole: UserRole = 'borrower';
    if (data.role && VALID_ROLES.includes(data.role as UserRole)) {
      userRole = data.role as UserRole;
    }
    console.log(`📝 Creating user with role: ${userRole}`);

    // Create user with password_hash included
    console.log('📝 Creating user in database...');
    const user = await userRepo.create({
      id: generateId(),
      email: data.email.toLowerCase().trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.phoneNumber?.trim() || null,
      role: userRole,
      status: 'pending',
      password_hash: hashedPassword,
      email_verified: false,
      phone_verified: false,
    });
    console.log('✅ User created:', user.id);

    // Generate tokens
    console.log('🔑 Generating JWT tokens...');
    const token = await signJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await signRefreshToken({
      sub: user.id,
    });
    console.log('✅ Tokens generated');

    // Store refresh token
    console.log('💾 Storing refresh token...');
    await refreshTokenRepo.create({
      id: generateId(),
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      revoked: false,
    });
    console.log('✅ Refresh token stored');

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
      token,
      refreshToken,
    };
  } catch (error) {
    console.error('❌ Error in registerUser:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  console.log('🟢 loginUser called with email:', email);
  
  try {
    // Validate inputs
    if (!email || !password) {
      throw AppError.badRequest('Email and password are required');
    }

    // Get user with password
    const user = await userRepo.getUserWithPassword(email);
    if (!user) {
      console.log('⚠️ User not found:', email);
      throw AppError.unauthorized('Invalid email or password');
    }

    // Verify password
    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      console.log('⚠️ Invalid password for user:', email);
      throw AppError.unauthorized('Invalid email or password');
    }

    // Check if user is active
    if (user.status !== 'active') {
      console.log('⚠️ User account is not active:', email, 'Status:', user.status);
      throw AppError.forbidden(`Account is ${user.status}. Please contact support.`);
    }

    console.log('✅ User authenticated:', user.id);

    // Generate tokens
    const token = await signJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await signRefreshToken({
      sub: user.id,
    });

    // Store refresh token
    await refreshTokenRepo.create({
      id: generateId(),
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      revoked: false,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
      token,
      refreshToken,
    };
  } catch (error) {
    console.error('❌ Error in loginUser:', error);
    throw error;
  }
}

export async function refreshToken(refreshToken: string) {
  console.log('🟢 refreshToken called');
  
  try {
    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken);
    const userId = payload.sub as string;

    // Check if token exists in DB
    const storedToken = await refreshTokenRepo.findByToken(refreshToken);
    if (!storedToken) {
      console.log('⚠️ Invalid refresh token');
      throw AppError.unauthorized('Invalid refresh token');
    }

    // Get user
    const user = await userRepo.findById(userId);
    if (!user) {
      console.log('⚠️ User not found for refresh token');
      throw AppError.unauthorized('User not found');
    }

    // Check if user is active
    if (user.status !== 'active') {
      throw AppError.forbidden('Account is not active');
    }

    // Revoke old refresh token
    await refreshTokenRepo.revokeToken(refreshToken);

    // Generate new tokens
    const newToken = await signJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = await signRefreshToken({
      sub: user.id,
    });

    // Store new refresh token
    await refreshTokenRepo.create({
      id: generateId(),
      user_id: user.id,
      token: newRefreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      revoked: false,
    });

    console.log('✅ Tokens refreshed for user:', user.id);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error('❌ Error in refreshToken:', error);
    throw error;
  }
}

export async function logoutUser(userId: string) {
  console.log('🟢 logoutUser called for user:', userId);
  
  try {
    await refreshTokenRepo.revokeAllUserTokens(userId);
    console.log('✅ User logged out:', userId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error in logoutUser:', error);
    throw error;
  }
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
  console.log('🟢 changePassword called for user:', userId);
  
  try {
    // Validate new password
    if (newPassword.length < 8) {
      throw AppError.badRequest('New password must be at least 8 characters');
    }

    // Get user with password
    const user = await userRepo.getUserWithPasswordById(userId);
    if (!user) {
      console.log('⚠️ User not found for password change');
      throw AppError.notFound('User not found');
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, user.password_hash);
    if (!isValid) {
      console.log('⚠️ Invalid current password for user:', userId);
      throw AppError.unauthorized('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    await userRepo.updatePassword(userId, hashedPassword);

    // Revoke all refresh tokens for security
    await refreshTokenRepo.revokeAllUserTokens(userId);

    console.log('✅ Password changed for user:', userId);
    return { success: true };
  } catch (error) {
    console.error('❌ Error in changePassword:', error);
    throw error;
  }
}



// import { hashPassword, comparePassword } from '../utils/hash';
// import { signJWT, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
// import { UserRepository } from '../repositories/userRepository';
// import { RefreshTokenRepository } from '../repositories/refreshTokenRepository';
// import { AppError } from '../errors/AppError';
// import { generateId } from '../utils/helpers';

// const userRepo = new UserRepository();
// const refreshTokenRepo = new RefreshTokenRepository();

// // Valid roles
// const VALID_ROLES = ['borrower', 'manager', 'auditor', 'admin'] as const;
// type UserRole = typeof VALID_ROLES[number];

// export async function registerUser(data: {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
//   role?: string;
// }) {
//   console.log('🟢 registerUser called with email:', data.email);
//   console.log('👤 Role provided:', data.role || 'defaulting to borrower');
  
//   try {
//     // Validate email format
//     if (!data.email || !data.email.includes('@')) {
//       throw AppError.badRequest('Invalid email format');
//     }

//     // Validate password strength
//     if (data.password.length < 8) {
//       throw AppError.badRequest('Password must be at least 8 characters');
//     }

//     // Check if user already exists
//     console.log('🔍 Checking if user exists...');
//     const existingUser = await userRepo.findByEmail(data.email);
//     if (existingUser) {
//       console.log('⚠️ User already exists:', data.email);
//       throw AppError.conflict('User with this email already exists');
//     }

//     // Hash password
//     console.log('🔐 Hashing password...');
//     const hashedPassword = await hashPassword(data.password);
//     console.log('✅ Password hashed successfully');

//     // Validate and set role
//     let userRole: UserRole = 'borrower';
//     if (data.role && VALID_ROLES.includes(data.role as UserRole)) {
//       userRole = data.role as UserRole;
//     }
//     console.log(`📝 Creating user with role: ${userRole}`);

//     // Create user with password_hash included
//     console.log('📝 Creating user in database...');
//     const user = await userRepo.create({
//       id: generateId(),
//       email: data.email.toLowerCase().trim(),
//       firstName: data.firstName.trim(),
//       lastName: data.lastName.trim(),
//       phoneNumber: data.phoneNumber?.trim() || null,
//       role: userRole,
//       status: 'pending',
//       password_hash: hashedPassword,
//       email_verified: false,
//       phone_verified: false,
//     });
//     console.log('✅ User created:', user.id);

//     // Generate tokens
//     console.log('🔑 Generating JWT tokens...');
//     const token = await signJWT({
//       sub: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     const refreshToken = await signRefreshToken({
//       sub: user.id,
//     });
//     console.log('✅ Tokens generated');

//     // Store refresh token
//     console.log('💾 Storing refresh token...');
//     await refreshTokenRepo.create({
//       id: generateId(),
//       user_id: user.id,
//       token: refreshToken,
//       expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       revoked: false,
//     });
//     console.log('✅ Refresh token stored');

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         role: user.role,
//         status: user.status,
//       },
//       token,
//       refreshToken,
//     };
//   } catch (error) {
//     console.error('❌ Error in registerUser:', error);
//     throw error;
//   }
// }

// export async function loginUser(email: string, password: string) {
//   console.log('🟢 loginUser called with email:', email);
  
//   try {
//     // Validate inputs
//     if (!email || !password) {
//       throw AppError.badRequest('Email and password are required');
//     }

//     // Get user with password
//     const user = await userRepo.getUserWithPassword(email);
//     if (!user) {
//       console.log('⚠️ User not found:', email);
//       throw AppError.unauthorized('Invalid email or password');
//     }

//     // Verify password
//     const isValid = await comparePassword(password, user.password_hash);
//     if (!isValid) {
//       console.log('⚠️ Invalid password for user:', email);
//       throw AppError.unauthorized('Invalid email or password');
//     }

//     // Check if user is active
//     if (user.status !== 'active') {
//       console.log('⚠️ User account is not active:', email, 'Status:', user.status);
//       throw AppError.forbidden(`Account is ${user.status}. Please contact support.`);
//     }

//     console.log('✅ User authenticated:', user.id);

//     // Generate tokens
//     const token = await signJWT({
//       sub: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     const refreshToken = await signRefreshToken({
//       sub: user.id,
//     });

//     // Store refresh token
//     await refreshTokenRepo.create({
//       id: generateId(),
//       user_id: user.id,
//       token: refreshToken,
//       expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       revoked: false,
//     });

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         role: user.role,
//         status: user.status,
//       },
//       token,
//       refreshToken,
//     };
//   } catch (error) {
//     console.error('❌ Error in loginUser:', error);
//     throw error;
//   }
// }

// export async function refreshToken(refreshToken: string) {
//   console.log('🟢 refreshToken called');
  
//   try {
//     // Verify refresh token
//     const payload = await verifyRefreshToken(refreshToken);
//     const userId = payload.sub as string;

//     // Check if token exists in DB
//     const storedToken = await refreshTokenRepo.findByToken(refreshToken);
//     if (!storedToken) {
//       console.log('⚠️ Invalid refresh token');
//       throw AppError.unauthorized('Invalid refresh token');
//     }

//     // Get user
//     const user = await userRepo.findById(userId);
//     if (!user) {
//       console.log('⚠️ User not found for refresh token');
//       throw AppError.unauthorized('User not found');
//     }

//     // Check if user is active
//     if (user.status !== 'active') {
//       throw AppError.forbidden('Account is not active');
//     }

//     // Revoke old refresh token
//     await refreshTokenRepo.revokeToken(refreshToken);

//     // Generate new tokens
//     const newToken = await signJWT({
//       sub: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     const newRefreshToken = await signRefreshToken({
//       sub: user.id,
//     });

//     // Store new refresh token
//     await refreshTokenRepo.create({
//       id: generateId(),
//       user_id: user.id,
//       token: newRefreshToken,
//       expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       revoked: false,
//     });

//     console.log('✅ Tokens refreshed for user:', user.id);

//     return {
//       token: newToken,
//       refreshToken: newRefreshToken,
//     };
//   } catch (error) {
//     console.error('❌ Error in refreshToken:', error);
//     throw error;
//   }
// }

// export async function logoutUser(userId: string) {
//   console.log('🟢 logoutUser called for user:', userId);
  
//   try {
//     await refreshTokenRepo.revokeAllUserTokens(userId);
//     console.log('✅ User logged out:', userId);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Error in logoutUser:', error);
//     throw error;
//   }
// }

// export async function changePassword(
//   userId: string,
//   currentPassword: string,
//   newPassword: string
// ) {
//   console.log('🟢 changePassword called for user:', userId);
  
//   try {
//     // Validate new password
//     if (newPassword.length < 8) {
//       throw AppError.badRequest('New password must be at least 8 characters');
//     }

//     // Get user with password
//     const user = await userRepo.getUserWithPasswordById(userId);
//     if (!user) {
//       console.log('⚠️ User not found for password change');
//       throw AppError.notFound('User not found');
//     }

//     // Verify current password
//     const isValid = await comparePassword(currentPassword, user.password_hash);
//     if (!isValid) {
//       console.log('⚠️ Invalid current password for user:', userId);
//       throw AppError.unauthorized('Current password is incorrect');
//     }

//     // Hash new password
//     const hashedPassword = await hashPassword(newPassword);
//     await userRepo.updatePassword(userId, hashedPassword);

//     // Revoke all refresh tokens for security
//     await refreshTokenRepo.revokeAllUserTokens(userId);

//     console.log('✅ Password changed for user:', userId);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Error in changePassword:', error);
//     throw error;
//   }
// }


// import { hashPassword, comparePassword } from '../utils/hash';
// import { signJWT, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
// import { UserRepository } from '../repositories/userRepository';
// import { RefreshTokenRepository } from '../repositories/refreshTokenRepository';
// import { AppError } from '../errors/AppError';
// import { generateId } from '../utils/helpers';

// const userRepo = new UserRepository();
// const refreshTokenRepo = new RefreshTokenRepository();

// export async function registerUser(data: {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
// }) {
//   console.log('🟢 registerUser called with email:', data.email);
  
//   try {
//     // Check if user already exists
//     console.log('🔍 Checking if user exists...');
//     const existingUser = await userRepo.findByEmail(data.email);
//     if (existingUser) {
//       console.log('⚠️ User already exists:', data.email);
//       throw AppError.conflict('User with this email already exists');
//     }

//     // Hash password
//     console.log('🔐 Hashing password...');
//     const hashedPassword = await hashPassword(data.password);
//     console.log('✅ Password hashed successfully');

//     // Create user with password_hash included
//     console.log('📝 Creating user in database...');
//     const user = await userRepo.create({
//       id: generateId(),
//       email: data.email,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       phoneNumber: data.phoneNumber,
//       role: 'borrower',
//       status: 'pending',
//       password_hash: hashedPassword,
//       email_verified: false,
//       phone_verified: false,
//     });
//     console.log('✅ User created:', user.id);

//     // Generate tokens
//     console.log('🔑 Generating JWT tokens...');
//     const token = await signJWT({
//       sub: user.id,
//       email: user.email,
//       role: user.role,
//     });

//     const refreshToken = await signRefreshToken({
//       sub: user.id,
//     });
//     console.log('✅ Tokens generated');

//     // Store refresh token
//     console.log('💾 Storing refresh token...');
//     await refreshTokenRepo.create({
//       id: generateId(),
//       user_id: user.id,
//       token: refreshToken,
//       expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       revoked: false,
//     });
//     console.log('✅ Refresh token stored');

//     return {
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         role: user.role,
//         status: user.status,
//       },
//       token,
//       refreshToken,
//     };
//   } catch (error) {
//     console.error('❌ Error in registerUser:', error);
//     throw error;
//   }
// }

// export async function loginUser(email: string, password: string) {
//   // Get user with password
//   const user = await userRepo.getUserWithPassword(email);
//   if (!user) {
//     throw AppError.unauthorized('Invalid email or password');
//   }

//   // Verify password
//   const isValid = await comparePassword(password, user.password_hash);
//   if (!isValid) {
//     throw AppError.unauthorized('Invalid email or password');
//   }

//   // Check if user is active
//   if (user.status !== 'active') {
//     throw AppError.forbidden('Account is not active');
//   }

//   // Generate tokens
//   const token = await signJWT({
//     sub: user.id,
//     email: user.email,
//     role: user.role,
//   });

//   const refreshToken = await signRefreshToken({
//     sub: user.id,
//   });

//   // Store refresh token
//   await refreshTokenRepo.create({
//     id: generateId(),
//     user_id: user.id,
//     token: refreshToken,
//     expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     revoked: false,
//   });

//   return {
//     user: {
//       id: user.id,
//       email: user.email,
//       firstName: user.first_name,
//       lastName: user.last_name,
//       role: user.role,
//       status: user.status,
//     },
//     token,
//     refreshToken,
//   };
// }

// export async function refreshToken(refreshToken: string) {
//   // Verify refresh token
//   const payload = await verifyRefreshToken(refreshToken);
//   const userId = payload.sub as string;

//   // Check if token exists in DB
//   const storedToken = await refreshTokenRepo.findByToken(refreshToken);
//   if (!storedToken) {
//     throw AppError.unauthorized('Invalid refresh token');
//   }

//   // Get user
//   const user = await userRepo.findById(userId);
//   if (!user) {
//     throw AppError.unauthorized('User not found');
//   }

//   // Revoke old refresh token
//   await refreshTokenRepo.revokeToken(refreshToken);

//   // Generate new tokens
//   const newToken = await signJWT({
//     sub: user.id,
//     email: user.email,
//     role: user.role,
//   });

//   const newRefreshToken = await signRefreshToken({
//     sub: user.id,
//   });

//   // Store new refresh token
//   await refreshTokenRepo.create({
//     id: generateId(),
//     user_id: user.id,
//     token: newRefreshToken,
//     expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     revoked: false,
//   });

//   return {
//     token: newToken,
//     refreshToken: newRefreshToken,
//   };
// }

// export async function logoutUser(userId: string) {
//   await refreshTokenRepo.revokeAllUserTokens(userId);
//   return { success: true };
// }

// export async function changePassword(
//   userId: string,
//   currentPassword: string,
//   newPassword: string
// ) {
//   const user = await userRepo.getUserWithPasswordById(userId);
//   if (!user) {
//     throw AppError.notFound('User not found');
//   }

//   const isValid = await comparePassword(currentPassword, user.password_hash);
//   if (!isValid) {
//     throw AppError.unauthorized('Current password is incorrect');
//   }

//   const hashedPassword = await hashPassword(newPassword);
//   await userRepo.updatePassword(userId, hashedPassword);

//   // Revoke all refresh tokens for security
//   await refreshTokenRepo.revokeAllUserTokens(userId);

//   return { success: true };
// }
