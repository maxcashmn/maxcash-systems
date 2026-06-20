import { NotificationRepository } from '../repositories/notificationRepository';
import { generateId } from '../utils/helpers';
import { sendEmail, sendWelcomeEmail, sendLoanApprovedEmail } from '../adapters/emailjs.adapter';
import { sendWhatsAppMessage } from '../adapters/whatsapp.adapter';

const notificationRepo = new NotificationRepository();

export async function createNotification(data: {
  userId: string;
  type: string;
  channel: string;
  subject: string;
  content: string;
}) {
  return await notificationRepo.create({
    id: generateId(),
    user_id: data.userId,
    type: data.type,
    channel: data.channel,
    subject: data.subject,
    content: data.content,
    status: 'pending',
  });
}

export async function sendNotification(notificationId: string) {
  const notification = await notificationRepo.findById(notificationId);
  if (!notification) {
    throw new Error('Notification not found');
  }

  try {
    if (notification.channel === 'email') {
      await sendEmail({
        to: notification.user_id,
        subject: notification.subject,
        html: notification.content,
      });
    } else if (notification.channel === 'whatsapp') {
      await sendWhatsAppMessage({
        to: notification.user_id,
        message: notification.content,
      });
    }

    await notificationRepo.markAsSent(notificationId);
    return { success: true };
  } catch (error) {
    console.error('Failed to send notification:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeNotification(userId: string, email: string, name: string) {
  const emailNotification = await createNotification({
    userId,
    type: 'welcome',
    channel: 'email',
    subject: 'Welcome to MaxCash!',
    content: `Welcome ${name}! Your account has been created.`,
  });

  await sendWelcomeEmail(email, name);
  await notificationRepo.markAsSent(emailNotification.id);

  return { success: true };
}

export async function sendLoanApprovedNotification(
  userId: string,
  email: string,
  name: string,
  amount: number,
  loanId: string
) {
  const notification = await createNotification({
    userId,
    type: 'loan_approved',
    channel: 'email',
    subject: 'Loan Approved!',
    content: `Congratulations! Your loan of $${amount} has been approved.`,
  });

  await sendLoanApprovedEmail(email, name, amount, loanId);
  await notificationRepo.markAsSent(notification.id);

  return { success: true };
}

export async function getUserNotifications(userId: string) {
  return await notificationRepo.findByUserId(userId);
}

export async function getUnreadNotifications(userId: string) {
  return await notificationRepo.findUnreadByUserId(userId);
}

export async function markNotificationAsRead(notificationId: string) {
  await notificationRepo.markAsRead(notificationId);
  return { success: true };
}
