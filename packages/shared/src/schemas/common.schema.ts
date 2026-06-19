import { z } from 'zod';

export const idSchema = z.string().uuid();
export const emailSchema = z.string().email();
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});
