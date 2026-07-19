import { z } from 'zod';

export const loginValidator = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerValidator = z.object({
  email: z.string().email('Invalid email format'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters'),

  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),

  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),

  phoneNumber: z.string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .optional(),

  role: z.enum([
    'borrower',
    'manager',
    'auditor',
    'admin',
  ]).default('borrower'),
});

export const refreshTokenValidator = z.object({
  refreshToken: z.string()
    .min(1, 'Refresh token is required'),
});

export const resetPasswordValidator = z.object({
  email: z.string()
    .email('Invalid email format'),
});

export const updatePasswordValidator = z.object({
  currentPassword: z.string()
    .min(8, 'Current password must be at least 8 characters'),

  newPassword: z.string()
    .min(8, 'New password must be at least 8 characters'),

  confirmPassword: z.string()
    .min(8, 'Confirm password must be at least 8 characters'),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export const verifyEmailValidator = z.object({
  token: z.string()
    .min(10, 'Verification token is required'),
});

export const resendVerificationValidator = z.object({
  email: z.string()
    .email('Invalid email format'),
});

export const verifyOTPValidator = z.object({
  email: z.string()
    .email('Invalid email format'),

  otp: z.string()
    .length(6, 'OTP must be 6 digits'),
});


// import { z } from 'zod';

// export const loginValidator = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
// });

// export const registerValidator = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
//   lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
//   phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional(),
//   role: z.enum(['borrower', 'manager', 'auditor', 'admin']).default('borrower'), // ✅ ADDED
// });

// export const refreshTokenValidator = z.object({
//   refreshToken: z.string().min(1, 'Refresh token is required'),
// });

// export const resetPasswordValidator = z.object({
//   email: z.string().email('Invalid email format'),
// });

// export const updatePasswordValidator = z.object({
//   currentPassword: z.string().min(8, 'Current password must be at least 8 characters'),
//   newPassword: z.string().min(8, 'New password must be at least 8 characters'),
//   confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// export const verifyOTPValidator = z.object({
//   email: z.string().email('Invalid email format'),
//   otp: z.string().length(6, 'OTP must be 6 digits'),
// });









// import { z } from 'zod';

// export const loginValidator = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
// });

// export const registerValidator = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
//   firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
//   lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
//   phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional(),
// });

// export const refreshTokenValidator = z.object({
//   refreshToken: z.string().min(1, 'Refresh token is required'),
// });

// export const resetPasswordValidator = z.object({
//   email: z.string().email('Invalid email format'),
// });

// export const updatePasswordValidator = z.object({
//   currentPassword: z.string().min(8, 'Current password must be at least 8 characters'),
//   newPassword: z.string().min(8, 'New password must be at least 8 characters'),
//   confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

// export const verifyOTPValidator = z.object({
//   email: z.string().email('Invalid email format'),
//   otp: z.string().length(6, 'OTP must be 6 digits'),
// });
