import { Hono } from 'hono';
import { authMiddleware } from '../../middleware/auth';
import { 
  getUserNotifications,
  getUnreadNotifications,
  markNotificationAsRead
} from '../../services/notificationService';
import { z } from 'zod';

const notificationIdValidator = z.object({
  id: z.string().uuid('Invalid notification ID format'),
});

const notificationsRoutes = new Hono();

// Get my notifications
notificationsRoutes.get('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const notifications = await getUserNotifications(userId);
  return c.json({
    success: true,
    data: notifications,
  });
});

// Get unread notifications
notificationsRoutes.get('/unread', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const notifications = await getUnreadNotifications(userId);
  return c.json({
    success: true,
    data: notifications,
  });
});

// Mark notification as read
notificationsRoutes.patch('/:id/read', authMiddleware, async (c) => {
  const { id } = c.req.param();
  notificationIdValidator.parse({ id });
  await markNotificationAsRead(id);
  return c.json({
    success: true,
    message: 'Notification marked as read',
  });
});

export default notificationsRoutes;
