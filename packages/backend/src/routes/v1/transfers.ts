import { Hono } from 'hono';
import { 
  initiateTransferValidator, 
  transferIdValidator,
  transferReferenceValidator
} from '../../validators';
import { 
  initiateTransfer, 
  getTransferById, 
  getUserTransfers,
  getTransferByReference
} from '../../services/transferService';
import { authMiddleware } from '../../middleware/auth';

const transfersRoutes = new Hono();

// Initiate transfer
transfersRoutes.post('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = initiateTransferValidator.parse(body);
  const transfer = await initiateTransfer({ ...validated, fromUserId: userId });
  return c.json({
    success: true,
    message: 'Transfer initiated successfully',
    data: transfer,
  }, 201);
});

// List my transfers
transfersRoutes.get('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const transfers = await getUserTransfers(userId);
  return c.json({
    success: true,
    data: transfers,
  });
});

// Get transfer by ID
transfersRoutes.get('/:id', authMiddleware, async (c) => {
  const { id } = c.req.param();
  transferIdValidator.parse({ id });
  const transfer = await getTransferById(id);
  return c.json({
    success: true,
    data: transfer,
  });
});

// Get transfer by reference
transfersRoutes.get('/reference/:reference', authMiddleware, async (c) => {
  const { reference } = c.req.param();
  transferReferenceValidator.parse({ reference });
  const transfer = await getTransferByReference(reference);
  return c.json({
    success: true,
    data: transfer,
  });
});

export default transfersRoutes;
