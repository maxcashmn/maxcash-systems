import { z } from 'zod';

export const updateProfileValidator = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long').optional(),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long').optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional(),
  email: z.string().email('Invalid email format').optional(),
});

export const updateUserStatusValidator = z.object({
  status: z.enum(['active', 'inactive', 'suspended', 'pending'], {
    errorMap: () => ({ message: 'Invalid status value' }),
  }),
  reason: z.string().optional(),
});

export const listUsersValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  role: z.enum(['admin', 'manager', 'auditor', 'borrower']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
});

export const userIdValidator = z.object({
  id: z.string().uuid('Invalid user ID format'),
});
