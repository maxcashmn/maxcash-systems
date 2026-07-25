// src/routes/v1/loans.ts

import { Hono } from 'hono';

import {
  applyLoanValidator,
  approveLoanValidator,
  rejectLoanValidator,
  loanIdValidator,
} from '../../validators';

import {
  applyForLoan,
  approveLoan,
  rejectLoan,
  disburseLoan,
  getLoanById,
  getUserLoans,
  getActiveLoans,
} from '../../services/loanService';

import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/rbac';

import type { Bindings } from '../../types';

const loansRoutes = new Hono<{
  Bindings: Bindings;
}>();

// ===============================
// Apply For Loan
// ===============================
loansRoutes.post(
  '/',
  authMiddleware,
  async (c) => {
    const user = c.get('user');
    const body = await c.req.json();
    const validated = applyLoanValidator.parse(body);

    // Ensure all required fields are present with defaults
    const loan = await applyForLoan({
      userId: user.sub,
      amount: validated.amount || 0,
      termMonths: validated.termMonths || 12,
      purpose: validated.purpose || 'general',
      employmentStatus: validated.employmentStatus || 'employed',
      monthlyIncome: validated.monthlyIncome || 0,
    });

    return c.json(
      {
        success: true,
        message: 'Loan application submitted successfully',
        data: loan,
      },
      201
    );
  }
);

// ===============================
// List My Loans
// ===============================
loansRoutes.get(
  '/',
  authMiddleware,
  async (c) => {
    const user = c.get('user');
    const loans = await getUserLoans(user.sub);

    return c.json({
      success: true,
      data: loans,
    });
  }
);

// ===============================
// Get Loan By ID
// ===============================
loansRoutes.get(
  '/:id',
  authMiddleware,
  async (c) => {
    const { id } = c.req.param();
    loanIdValidator.parse({ id });
    const loan = await getLoanById(id);

    return c.json({
      success: true,
      data: loan,
    });
  }
);

// ===============================
// Approve Loan
// Admin / Manager
// ===============================
loansRoutes.patch(
  '/:id/approve',
  authMiddleware,
  requireRole('admin', 'manager'),
  async (c) => {
    const { id } = c.req.param();
    loanIdValidator.parse({ id });
    const user = c.get('user');
    
    // Validate the request body
    const body = await c.req.json();
    approveLoanValidator.parse(body);

    // approveLoan takes 2 arguments: loanId and userId
    await approveLoan(id, user.sub);

    return c.json({
      success: true,
      message: 'Loan approved successfully',
    });
  }
);

// ===============================
// Reject Loan
// Admin / Manager
// ===============================
loansRoutes.patch(
  '/:id/reject',
  authMiddleware,
  requireRole('admin', 'manager'),
  async (c) => {
    const { id } = c.req.param();
    loanIdValidator.parse({ id });
    const body = await c.req.json();
    const validated = rejectLoanValidator.parse(body);

    await rejectLoan(id, validated.reason);

    return c.json({
      success: true,
      message: 'Loan rejected successfully',
    });
  }
);

// ===============================
// Disburse Loan
// Admin Only
// ===============================
loansRoutes.patch(
  '/:id/disburse',
  authMiddleware,
  requireRole('admin'),
  async (c) => {
    const { id } = c.req.param();
    loanIdValidator.parse({ id });

    const loan = await disburseLoan(id);

    return c.json({
      success: true,
      message: 'Loan disbursed successfully',
      data: loan,
    });
  }
);

// ===============================
// Active Loans
// Admin / Manager
// ===============================
loansRoutes.get(
  '/active/all',
  authMiddleware,
  requireRole('admin', 'manager'),
  async (c) => {
    const loans = await getActiveLoans();

    return c.json({
      success: true,
      data: loans,
    });
  }
);

// ===============================
// Error Handling
// ===============================
loansRoutes.onError((err, c) => {
  console.error('Loan route error:', err);
  return c.json(
    {
      success: false,
      message: err.message || 'Internal server error',
    },
    500
  );
});

export default loansRoutes;
