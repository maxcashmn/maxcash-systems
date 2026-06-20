import { Hono } from 'hono';
import { 
  updateProfileValidator, 
  updateUserStatusValidator,
  listUsersValidator,
  userIdValidator
} from '../../validators';
import { 
  getUserById, 
  updateUserProfile, 
  updateUserStatus,
  deleteUser,
  listUsers
} from '../../services/userService';
import { authMiddleware } from '../../middleware/auth';
import { requireRole } from '../../middleware/rbac';

const usersRoutes = new Hono();

// Get current user profile
usersRoutes.get('/me', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const user = await getUserById(userId);
  return c.json({
    success: true,
    data: user,
  });
});

// Update current user profile
usersRoutes.put('/me', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json();
  const validated = updateProfileValidator.parse(body);
  const user = await updateUserProfile(userId, validated);
  return c.json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

// List users (Admin only)
usersRoutes.get('/', authMiddleware, requireRole('admin'), async (c) => {
  const query = c.req.query();
  const validated = listUsersValidator.parse({
    page: query.page ? parseInt(query.page) : 1,
    limit: query.limit ? parseInt(query.limit) : 10,
    role: query.role,
    status: query.status,
  });
  const result = await listUsers(
    validated.page,
    validated.limit,
    { role: validated.role, status: validated.status }
  );
  return c.json({
    success: true,
    data: result,
  });
});

// Get user by ID (Admin only)
usersRoutes.get('/:id', authMiddleware, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  userIdValidator.parse({ id });
  const user = await getUserById(id);
  return c.json({
    success: true,
    data: user,
  });
});

// Update user status (Admin only)
usersRoutes.patch('/:id/status', authMiddleware, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  userIdValidator.parse({ id });
  const body = await c.req.json();
  const validated = updateUserStatusValidator.parse(body);
  await updateUserStatus(id, validated.status);
  return c.json({
    success: true,
    message: 'User status updated successfully',
  });
});

// Delete user (Admin only)
usersRoutes.delete('/:id', authMiddleware, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  userIdValidator.parse({ id });
  await deleteUser(id);
  return c.json({
    success: true,
    message: 'User deleted successfully',
  });
});

export default usersRoutes;
