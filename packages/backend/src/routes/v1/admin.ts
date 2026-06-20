import { Hono } from 'hono';
import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/rbac';
import { getReconciliationReport } from '../../services/reconciliationService';

const adminRoutes = new Hono();

// Get system health
adminRoutes.get('/health', authMiddleware, requireRole('admin'), async (c) => {
  return c.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

// Get reconciliation report
adminRoutes.get('/reconciliation', authMiddleware, requireRole('admin'), async (c) => {
  const report = await getReconciliationReport();
  return c.json({
    success: true,
    data: report,
  });
});

// System statistics
adminRoutes.get('/stats', authMiddleware, requireRole('admin'), async (c) => {
  // TODO: Implement system stats
  return c.json({
    success: true,
    data: {
      users: { total: 0, active: 0 },
      loans: { total: 0, active: 0 },
      transactions: { total: 0, today: 0 },
    },
  });
});

export default adminRoutes;
