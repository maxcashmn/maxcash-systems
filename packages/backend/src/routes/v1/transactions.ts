import { Hono } from 'hono';
import { 
  createTransactionValidator,
  listTransactionsValidator,
  transactionIdValidator,
  transactionReferenceValidator
} from '../../validators';
import { 
  createTransaction,
  getTransactionById,
  listTransactions,
  getTransactionByReference
} from '../../services/transactionService';
import { authMiddleware } from '../../middleware/auth';

const transactionsRoutes = new Hono();

// Create transaction
transactionsRoutes.post('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = createTransactionValidator.parse(body);
  const transaction = await createTransaction({ ...validated, userId });
  return c.json({
    success: true,
    message: 'Transaction created successfully',
    data: transaction,
  }, 201);
});

// List my transactions
transactionsRoutes.get('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const query = c.req.query();
  const validated = listTransactionsValidator.parse({
    page: query.page ? parseInt(query.page) : 1,
    limit: query.limit ? parseInt(query.limit) : 10,
    type: query.type,
    status: query.status,
  });
  const result = await listTransactions(
    userId,
    validated.page,
    validated.limit,
    { type: validated.type, status: validated.status }
  );
  return c.json({
    success: true,
    data: result,
  });
});

// Get transaction by ID
transactionsRoutes.get('/:id', authMiddleware, async (c) => {
  const { id } = c.req.param();
  transactionIdValidator.parse({ id });
  const transaction = await getTransactionById(id);
  return c.json({
    success: true,
    data: transaction,
  });
});

// Get transaction by reference
transactionsRoutes.get('/reference/:reference', authMiddleware, async (c) => {
  const { reference } = c.req.param();
  transactionReferenceValidator.parse({ reference });
  const transaction = await getTransactionByReference(reference);
  return c.json({
    success: true,
    data: transaction,
  });
});

export default transactionsRoutes;
