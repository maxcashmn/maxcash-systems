import { z } from 'zod';
import { emailSchema, phoneSchema } from './common.schema';

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phoneNumber: phoneSchema.optional(),
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
