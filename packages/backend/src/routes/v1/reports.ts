// src/routes/v1/reports.ts

import { Hono } from 'hono';

import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/rbac';

import type { Bindings } from '../../types';


const reportsRoutes = new Hono<{
  Bindings: Bindings;
}>();


// ===============================
// Transaction Report (Admin Only)
// ===============================
reportsRoutes.get(
  '/transactions',
  authMiddleware,
  requireRole('admin'),
  async (c) => {

    // TODO:
    // Replace with reportService.getTransactionReport()

    return c.json({
      success: true,
      data: {
        totalTransactions: 0,
        totalAmount: 0,
        byType: {},
        byStatus: {},
      },
    });
  }
);


// ===============================
// Loan Report (Admin Only)
// ===============================
reportsRoutes.get(
  '/loans',
  authMiddleware,
  requireRole('admin'),
  async (c) => {

    // TODO:
    // Replace with reportService.getLoanReport()

    return c.json({
      success: true,
      data: {
        totalLoans: 0,
        totalAmount: 0,
        byStatus: {},
        approvalRate: 0,
      },
    });
  }
);


// ===============================
// User Report (Admin Only)
// ===============================
reportsRoutes.get(
  '/users',
  authMiddleware,
  requireRole('admin'),
  async (c) => {

    // TODO:
    // Replace with reportService.getUserReport()

    return c.json({
      success: true,
      data: {
        totalUsers: 0,
        byRole: {},
        byStatus: {},
        newUsers: 0,
      },
    });
  }
);


export default reportsRoutes;



// import { Hono } from 'hono';
// import { authMiddleware } from '../../middleware/auth';
// import { requireRole } from '../../middleware/rbac';

// const reportsRoutes = new Hono();

// // Get transaction report (Admin only)
// reportsRoutes.get('/transactions', authMiddleware, requireRole('admin'), async (c) => {
//   // TODO: Implement transaction report
//   return c.json({
//     success: true,
//     data: {
//       totalTransactions: 0,
//       totalAmount: 0,
//       byType: {},
//       byStatus: {},
//     },
//   });
// });

// // Get loan report (Admin only)
// reportsRoutes.get('/loans', authMiddleware, requireRole('admin'), async (c) => {
//   // TODO: Implement loan report
//   return c.json({
//     success: true,
//     data: {
//       totalLoans: 0,
//       totalAmount: 0,
//       byStatus: {},
//       approvalRate: 0,
//     },
//   });
// });

// // Get user report (Admin only)
// reportsRoutes.get('/users', authMiddleware, requireRole('admin'), async (c) => {
//   // TODO: Implement user report
//   return c.json({
//     success: true,
//     data: {
//       totalUsers: 0,
//       byRole: {},
//       byStatus: {},
//       newUsers: 0,
//     },
//   });
// });

// export default reportsRoutes;
