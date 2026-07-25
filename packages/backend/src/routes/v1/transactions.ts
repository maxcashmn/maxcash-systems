// src/routes/v1/transactions.ts

import { Hono } from 'hono';

import {
  createTransactionValidator,
  listTransactionsValidator,
  transactionIdValidator,
  transactionReferenceValidator,
} from '../../validators';

import {
  createTransaction,
  getTransactionById,
  listTransactions,
  getTransactionByReference,
} from '../../services/transactionService';

import { authMiddleware } from '../../middleware/auth';
import type { Bindings } from '../../types';

const transactionsRoutes = new Hono<{
  Bindings: Bindings;
}>();

// ===============================
// Create Transaction
// ===============================
transactionsRoutes.post(
  '/',
  authMiddleware,
  async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validated = createTransactionValidator.parse(body);

    // Ensure all required fields are present with defaults
    const transaction = await createTransaction({
      borrowerId: user.sub,
      type: validated.type || 'deposit',
      amount: validated.amount || 0,
      currency: validated.currency || 'USD',
      method: validated.method || 'manual',
      description: validated.description,
      metadata: validated.metadata,
      loanId: validated.loanId,
    });

    return c.json(
      {
        success: true,
        message: 'Transaction created successfully',
        data: transaction,
      },
      201
    );
  }
);

// ===============================
// List My Transactions
// ===============================
transactionsRoutes.get(
  '/',
  authMiddleware,
  async (c) => {
    const user = c.get('user');
    const query = c.req.query();

    const validated = listTransactionsValidator.parse({
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 10,
      type: query.type,
      status: query.status,
    });

    const result = await listTransactions(
      user.sub,
      validated.page,
      validated.limit,
      {
        type: validated.type,
        status: validated.status,
      }
    );

    return c.json({
      success: true,
      data: result,
    });
  }
);

// ===============================
// Get Transaction By Reference
// ===============================
transactionsRoutes.get(
  '/reference/:reference',
  authMiddleware,
  async (c) => {
    const { reference } = c.req.param();
    transactionReferenceValidator.parse({ reference });
    const transaction = await getTransactionByReference(reference);

    return c.json({
      success: true,
      data: transaction,
    });
  }
);

// ===============================
// Get Transaction By ID
// ===============================
transactionsRoutes.get(
  '/:id',
  authMiddleware,
  async (c) => {
    const { id } = c.req.param();
    transactionIdValidator.parse({ id });
    const transaction = await getTransactionById(id);

    return c.json({
      success: true,
      data: transaction,
    });
  }
);

// ===============================
// Error Handling
// ===============================
transactionsRoutes.onError((err, c) => {
  console.error('Transaction route error:', err);
  return c.json(
    {
      success: false,
      message: err.message || 'Internal server error',
    },
    500
  );
});

export default transactionsRoutes;