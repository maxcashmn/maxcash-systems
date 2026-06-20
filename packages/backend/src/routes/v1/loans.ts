import { Hono } from 'hono';
import { 
  applyLoanValidator, 
  approveLoanValidator,
  rejectLoanValidator,
  loanIdValidator
} from '../../validators';
import { 
  applyForLoan,
  approveLoan,
  rejectLoan,
  disburseLoan,
  getLoanById,
  getUserLoans,
  getActiveLoans
} from '../../services/loanService';
import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/rbac';

const loansRoutes = new Hono();

// Apply for loan
loansRoutes.post('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = applyLoanValidator.parse(body);
  const loan = await applyForLoan({ ...validated, userId });
  return c.json({
    success: true,
    message: 'Loan application submitted successfully',
    data: loan,
  }, 201);
});

// List my loans
loansRoutes.get('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const loans = await getUserLoans(userId);
  return c.json({
    success: true,
    data: loans,
  });
});

// Get loan by ID
loansRoutes.get('/:id', authMiddleware, async (c) => {
  const { id } = c.req.param();
  loanIdValidator.parse({ id });
  const loan = await getLoanById(id);
  return c.json({
    success: true,
    data: loan,
  });
});

// Approve loan (Manager/Admin only)
loansRoutes.patch('/:id/approve', authMiddleware, requireRole('admin', 'manager'), async (c) => {
  const { id } = c.req.param();
  loanIdValidator.parse({ id });
  const userId = c.get('userId');
  const body = await c.req.json();
  approveLoanValidator.parse(body);
  await approveLoan(id, userId);
  return c.json({
    success: true,
    message: 'Loan approved successfully',
  });
});

// Reject loan (Manager/Admin only)
loansRoutes.patch('/:id/reject', authMiddleware, requireRole('admin', 'manager'), async (c) => {
  const { id } = c.req.param();
  loanIdValidator.parse({ id });
  const body = await c.req.json();
  const validated = rejectLoanValidator.parse(body);
  await rejectLoan(id, validated.reason);
  return c.json({
    success: true,
    message: 'Loan rejected',
  });
});

// Disburse loan (Admin only)
loansRoutes.patch('/:id/disburse', authMiddleware, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  loanIdValidator.parse({ id });
  await disburseLoan(id);
  return c.json({
    success: true,
    message: 'Loan disbursed successfully',
  });
});

// Get active loans (Admin/Manager only)
loansRoutes.get('/active/all', authMiddleware, requireRole('admin', 'manager'), async (c) => {
  const loans = await getActiveLoans();
  return c.json({
    success: true,
    data: loans,
  });
});

export default loansRoutes;
