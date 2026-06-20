import { z } from 'zod';

export const applyLoanValidator = z.object({
  amount: z.number().positive('Loan amount must be greater than 0'),
  termMonths: z.number().int().min(1, 'Term must be at least 1 month').max(60, 'Term cannot exceed 60 months'),
  purpose: z.string().min(1, 'Purpose is required').max(255, 'Purpose too long'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  monthlyIncome: z.number().positive('Monthly income must be greater than 0'),
});

export const approveLoanValidator = z.object({
  notes: z.string().max(500, 'Notes too long').optional(),
});

export const rejectLoanValidator = z.object({
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason too long'),
});

export const loanIdValidator = z.object({
  id: z.string().uuid('Invalid loan ID format'),
});

export const listLoansValidator = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['pending', 'under_review', 'approved', 'rejected', 'disbursed', 'active', 'completed', 'defaulted']).optional(),
});

export const loanApplicationValidator = z.object({
  userId: z.string().uuid('Invalid user ID format'),
});
