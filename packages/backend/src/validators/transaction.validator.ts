import { z } from 'zod';

export const createTransactionValidator = z.object({
  type: z.enum(['deposit', 'withdrawal', 'transfer', 'loan_disbursement', 'loan_repayment', 'interest', 'fee'], {
    errorMap: () => ({ message: 'Invalid transaction type' }),
  }),
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().max(255, 'Description too long').optional(),
  metadata: z.record(z.any()).optional(),
});

export const transactionIdValidator = z.object({
  id: z.string().uuid('Invalid transaction ID format'),
});

export const listTransactionsValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  type: z.enum(['deposit', 'withdrawal', 'transfer', 'loan_disbursement', 'loan_repayment', 'interest', 'fee']).optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'reversed']).optional(),
});

export const transactionReferenceValidator = z.object({
  reference: z.string().min(1, 'Reference is required'),
});
