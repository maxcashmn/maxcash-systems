// src/routes/v1/transfers.ts

import { Hono } from 'hono';
import {
  initiateTransfer,
  getTransferById,
  getBorrowerTransfers,      // Changed from getUserTransfers
  getTransferByReference,
} from '../../services/transferService';
import { authMiddleware } from '../../middleware/auth';
import type { Bindings } from '../../types';

const transfersRoutes = new Hono<{
  Bindings: Bindings;
}>();

// ===============================
// Initiate Transfer
// ===============================
transfersRoutes.post(
  '/',
  authMiddleware,
  async (c) => {
    const user = c.get('user');
    const body = await c.req.json();

    const result = await initiateTransfer({
      fromBorrowerId: user.sub,  // Changed from fromUserId
      toBorrowerId: body.toBorrowerId,  // Changed from toUserId
      amount: body.amount,
      description: body.description,
    });

    return c.json({
      success: true,
      message: 'Transfer initiated successfully',
      data: result,
    });
  }
);

// ===============================
// Get My Transfers
// ===============================
transfersRoutes.get(
  '/',
  authMiddleware,
  async (c) => {
    const user = c.get('user');
    const transfers = await getBorrowerTransfers(user.sub);  // Changed from getUserTransfers

    return c.json({
      success: true,
      data: transfers,
    });
  }
);

// ===============================
// Get Transfer by ID
// ===============================
transfersRoutes.get(
  '/:id',
  authMiddleware,
  async (c) => {
    const { id } = c.req.param();
    const transfer = await getTransferById(id);

    return c.json({
      success: true,
      data: transfer,
    });
  }
);

// ===============================
// Get Transfer by Reference
// ===============================
transfersRoutes.get(
  '/reference/:reference',
  authMiddleware,
  async (c) => {
    const { reference } = c.req.param();
    const transfer = await getTransferByReference(reference);

    return c.json({
      success: true,
      data: transfer,
    });
  }
);

export default transfersRoutes;