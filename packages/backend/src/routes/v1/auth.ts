import { Hono } from 'hono';
import { 
  loginValidator, 
  registerValidator, 
  refreshTokenValidator,
  resetPasswordValidator,
  updatePasswordValidator
} from '../../validators';
import { 
  registerUser, 
  loginUser, 
  refreshToken, 
  logoutUser,
  changePassword 
} from '../../services/authService';
import { authMiddleware } from '../../middleware/auth';

const authRoutes = new Hono();

// Register
authRoutes.post('/register', async (c) => {
  const body = await c.req.json();
  const validated = registerValidator.parse(body);
  const result = await registerUser(validated);
  return c.json({
    success: true,
    message: 'Registration successful',
    data: result,
  }, 201);
});

// Login
authRoutes.post('/login', async (c) => {
  const body = await c.req.json();
  const validated = loginValidator.parse(body);
  const result = await loginUser(validated.email, validated.password);
  return c.json({
    success: true,
    message: 'Login successful',
    data: result,
  });
});

// Refresh Token
authRoutes.post('/refresh', async (c) => {
  const body = await c.req.json();
  const validated = refreshTokenValidator.parse(body);
  const result = await refreshToken(validated.refreshToken);
  return c.json({
    success: true,
    message: 'Token refreshed successfully',
    data: result,
  });
});

// Logout (Protected)
authRoutes.post('/logout', authMiddleware, async (c) => {
  const userId = c.get('userId');
  await logoutUser(userId);
  return c.json({
    success: true,
    message: 'Logout successful',
  });
});

// Change Password (Protected)
authRoutes.post('/change-password', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = updatePasswordValidator.parse(body);
  await changePassword(
    userId,
    validated.currentPassword,
    validated.newPassword
  );
  return c.json({
    success: true,
    message: 'Password changed successfully',
  });
});

// Forgot Password (Reset Request)
authRoutes.post('/forgot-password', async (c) => {
  const body = await c.req.json();
  resetPasswordValidator.parse(body);
  // TODO: Implement password reset email
  return c.json({
    success: true,
    message: 'Password reset email sent if account exists',
  });
});

export default authRoutes;
