import { z } from 'zod';

export const initiateTransferValidator = z.object({
  toUserId: z.string().uuid('Invalid recipient user ID'),
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().max(255, 'Description too long').optional(),
});

export const transferIdValidator = z.object({
  id: z.string().uuid('Invalid transfer ID format'),
});

export const listTransfersValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['pending', 'completed', 'failed', 'reversed']).optional(),
});

export const transferReferenceValidator = z.object({
  reference: z.string().min(1, 'Reference is required'),
});
