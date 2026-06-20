import { z } from 'zod';

export const createWalletValidator = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  currency: z.string().default('USD'),
});

export const updateWalletValidator = z.object({
  status: z.enum(['active', 'inactive', 'frozen', 'closed'], {
    errorMap: () => ({ message: 'Invalid status value' }),
  }),
});

export const fundWalletValidator = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  reference: z.string().min(1, 'Reference is required'),
});

export const withdrawValidator = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  reference: z.string().min(1, 'Reference is required'),
});

export const walletIdValidator = z.object({
  id: z.string().uuid('Invalid wallet ID format'),
});
