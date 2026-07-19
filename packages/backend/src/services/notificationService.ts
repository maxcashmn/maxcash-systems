// src/services/notificationService.ts

import { NotificationRepository } from '../repositories/notificationRepository';
import { generateId } from '../utils/helpers';

import { sendEmail } from '../adapters/emailjs.adapter';
import { sendWhatsAppMessage } from '../adapters/whatsapp.adapter';

const notificationRepo =
  new NotificationRepository();

interface CreateNotificationData {
  userId: string;
  type: string;
  channel: string;
  subject: string;
  content: string;
}


// ===============================
// Create Notification
// ===============================

export async function createNotification(
  data: CreateNotificationData
) {
  return notificationRepo.create({
    id: generateId(),
    user_id: data.userId,
    type: data.type,
    channel: data.channel,
    subject: data.subject,
    content: data.content,
    status: 'pending',
  });
}


// ===============================
// Send Notification
// ===============================

export async function sendNotification(
  notificationId: string
) {
  const notification =
    await notificationRepo.findById(
      notificationId
    );

  if (!notification) {
    throw new Error(
      'Notification not found'
    );
  }

  try {
    switch (notification.channel) {

      case 'email':
        await sendEmail({
          params: {
            to_email:
              notification.user_id,

            subject:
              notification.subject,

            message:
              notification.content,
          },
        });
        break;


      case 'whatsapp':
        await sendWhatsAppMessage({
          to:
            notification.user_id,

          message:
            notification.content,
        });
        break;


      default:
        throw new Error(
          `Unsupported notification channel: ${notification.channel}`
        );
    }


    await notificationRepo.markAsSent(
      notificationId
    );


    return {
      success: true,
    };

  } catch (error) {

    console.error(
      'Failed to send notification:',
      error
    );


    return {
      success: false,
      error,
    };
  }
}


// ===============================
// Welcome Notification
// ===============================

export async function sendWelcomeNotification(
  userId: string,
  email: string,
  name: string
) {

  const notification =
    await createNotification({

      userId,

      type:
        'welcome',

      channel:
        'email',

      subject:
        'Welcome to MaxCash',

      content:
        `Welcome ${name}! Your account has been created.`,
    });


  await sendEmail({

    templateId:
      'welcome_message',

    params: {

      to_email:
        email,

      user_name:
        name,

      subject:
        'Welcome to MaxCash',
    },

  });


  await notificationRepo.markAsSent(
    notification.id
  );


  return {
    success: true,
  };
}


// ===============================
// Loan Approved Notification
// ===============================

export async function sendLoanApprovedNotification(
  userId: string,
  email: string,
  name: string,
  amount: number,
  loanId: string
) {

  const notification =
    await createNotification({

      userId,

      type:
        'loan_approved',

      channel:
        'email',

      subject:
        'Loan Approved',

      content:
        `Congratulations! Your loan of $${amount} has been approved.`,
    });



  await sendEmail({

    templateId:
      'loan_approved',

    params: {

      to_email:
        email,

      user_name:
        name,

      loan_amount:
        amount,

      loan_id:
        loanId,

      subject:
        'Loan Approved',
    },

  });



  await notificationRepo.markAsSent(
    notification.id
  );


  return {
    success: true,
  };
}


// ===============================
// Queries
// ===============================

export async function getUserNotifications(
  userId: string
) {
  return notificationRepo.findByUserId(
    userId
  );
}


export async function getUnreadNotifications(
  userId: string
) {
  return notificationRepo.findUnreadByUserId(
    userId
  );
}


export async function markNotificationAsRead(
  notificationId: string
) {

  await notificationRepo.markAsRead(
    notificationId
  );


  return {
    success: true,
  };
}