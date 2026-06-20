import { Hono } from 'hono';
import { 
  createWalletValidator, 
  fundWalletValidator,
  withdrawValidator
} from '../../validators';
import { 
  createWallet, 
  getWallet, 
  getWalletBalance,
  fundWallet,
  withdrawFromWallet
} from '../../services/walletService';
import { authMiddleware } from '../../middleware/auth';

const walletsRoutes = new Hono();

// Create wallet
walletsRoutes.post('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = createWalletValidator.parse({ ...body, userId });
  const wallet = await createWallet(validated.userId, validated.currency);
  return c.json({
    success: true,
    message: 'Wallet created successfully',
    data: wallet,
  }, 201);
});

// Get my wallet
walletsRoutes.get('/me', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const wallet = await getWallet(userId);
  return c.json({
    success: true,
    data: wallet,
  });
});

// Get wallet balance
walletsRoutes.get('/me/balance', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const balance = await getWalletBalance(userId);
  return c.json({
    success: true,
    data: balance,
  });
});

// Fund wallet
walletsRoutes.post('/me/fund', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = fundWalletValidator.parse(body);
  const result = await fundWallet(userId, validated.amount, validated.reference);
  return c.json({
    success: true,
    message: 'Wallet funded successfully',
    data: result,
  });
});

// Withdraw from wallet
walletsRoutes.post('/me/withdraw', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = withdrawValidator.parse(body);
  const result = await withdrawFromWallet(userId, validated.amount, validated.reference);
  return c.json({
    success: true,
    message: 'Withdrawal successful',
    data: result,
  });
});

export default walletsRoutes;
