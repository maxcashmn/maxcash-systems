// packages/backend/src/services/whatsapp.service.ts
import { sendWhatsAppMessage, sendWhatsAppWelcome, sendWhatsAppLoanApproved } from '../adapters/whatsapp.adapter';
import { logger } from '../utils/logger';

interface WhatsAppMessageOptions {
  to: string;
  message: string;
  template?: {
    name: string;
    parameters: Record<string, string>;
  };
}

export const whatsappService = {
  /**
   * Send a WhatsApp message with template support
   */
  sendMessage: sendWhatsAppMessage,

  /**
   * Send welcome message to new users
   */
  sendWelcome: sendWhatsAppWelcome,

  /**
   * Send loan approved notification
   */
  sendLoanApproved: sendWhatsAppLoanApproved,

  /**
   * Send loan disbursed notification
   */
  async sendLoanDisbursed(to: string, name: string, amount: number): Promise<any> {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

    try {
      const result = await sendWhatsAppMessage({
        to,
        message: `Hello ${name}, your loan of ${formattedAmount} has been disbursed to your account.`,
        template: {
          name: 'loan_disbursed',
          parameters: {
            name: name,
            amount: amount.toString(),
            formattedAmount,
          },
        },
      });

      logger.info('Loan disbursed WhatsApp message sent', {
        to,
        name,
        amount,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send loan disbursed WhatsApp message', {
        to,
        name,
        amount,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send payment confirmed notification
   */
  async sendPaymentConfirmed(to: string, name: string, amount: number): Promise<any> {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

    try {
      const result = await sendWhatsAppMessage({
        to,
        message: `Hello ${name}, your payment of ${formattedAmount} has been confirmed.`,
        template: {
          name: 'payment_confirmed',
          parameters: {
            name: name,
            amount: amount.toString(),
            formattedAmount,
          },
        },
      });

      logger.info('Payment confirmed WhatsApp message sent', {
        to,
        name,
        amount,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send payment confirmed WhatsApp message', {
        to,
        name,
        amount,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send payment overdue notification
   */
  async sendPaymentOverdue(to: string, name: string, amount: number, days: number): Promise<any> {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

    try {
      const result = await sendWhatsAppMessage({
        to,
        message: `Hello ${name}, your payment of ${formattedAmount} is ${days} days overdue. Please make payment soon to avoid penalties.`,
        template: {
          name: 'payment_overdue',
          parameters: {
            name: name,
            amount: amount.toString(),
            days: days.toString(),
            formattedAmount,
          },
        },
      });

      logger.warn('Payment overdue WhatsApp message sent', {
        to,
        name,
        amount,
        days,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send payment overdue WhatsApp message', {
        to,
        name,
        amount,
        days,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send custom notification
   */
  async sendCustomNotification(
    to: string,
    name: string,
    message: string,
    templateName?: string,
    templateParams?: Record<string, string>
  ): Promise<any> {
    try {
      const options: WhatsAppMessageOptions = {
        to,
        message,
      };

      if (templateName && templateParams) {
        options.template = {
          name: templateName,
          parameters: templateParams,
        };
      }

      const result = await sendWhatsAppMessage(options);

      logger.info('Custom WhatsApp notification sent', {
        to,
        name,
        templateName,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send custom WhatsApp notification', {
        to,
        name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send payment reminder (convenience method)
   */
  async sendPaymentReminder(
    to: string,
    name: string,
    amount: number,
    dueDate: string
  ): Promise<any> {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

    const message = `Hello ${name}, this is a friendly reminder that your payment of ${formattedAmount} is due on ${dueDate}. Please ensure timely payment.`;

    try {
      const result = await sendWhatsAppMessage({
        to,
        message,
        template: {
          name: 'payment_reminder',
          parameters: {
            name: name,
            amount: amount.toString(),
            dueDate: dueDate,
            formattedAmount,
          },
        },
      });

      logger.info('Payment reminder WhatsApp message sent', {
        to,
        name,
        amount,
        dueDate,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send payment reminder WhatsApp message', {
        to,
        name,
        amount,
        dueDate,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send loan application received confirmation
   */
  async sendLoanApplicationReceived(to: string, name: string, applicationId: string): Promise<any> {
    const message = `Hello ${name}, we have received your loan application (#${applicationId}). Our team will review it and get back to you within 24-48 hours.`;

    try {
      const result = await sendWhatsAppMessage({
        to,
        message,
        template: {
          name: 'loan_application_received',
          parameters: {
            name: name,
            applicationId: applicationId,
          },
        },
      });

      logger.info('Loan application received WhatsApp message sent', {
        to,
        name,
        applicationId,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send loan application received WhatsApp message', {
        to,
        name,
        applicationId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send loan rejection notification
   */
  async sendLoanRejected(to: string, name: string, reason?: string): Promise<any> {
    let message = `Hello ${name}, we regret to inform you that your loan application was not approved at this time.`;
    
    if (reason) {
      message += `\n\nReason: ${reason}`;
    }
    
    message += `\n\nIf you have any questions, please contact our support team.`;

    try {
      const result = await sendWhatsAppMessage({
        to,
        message,
        template: {
          name: 'loan_rejected',
          parameters: {
            name: name,
            reason: reason || 'Not specified',
          },
        },
      });

      logger.info('Loan rejected WhatsApp message sent', {
        to,
        name,
        reason,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send loan rejected WhatsApp message', {
        to,
        name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send contact form confirmation to admin
   */
  async sendContactFormToAdmin(contactData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    subject?: string;
  }): Promise<any> {
    const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER || '+231777542605';
    
    const message = `
🌟 *New Contact Form Submission* 🌟

👤 *Name:* ${contactData.name}
📧 *Email:* ${contactData.email}
📱 *Phone:* ${contactData.phone}
${contactData.subject ? `📋 *Subject:* ${contactData.subject}` : ''}

📝 *Message:*
${contactData.message}

---
Sent via MaxCash Contact Form
    `.trim();

    try {
      const result = await sendWhatsAppMessage({
        to: adminNumber,
        message,
      });

      logger.info('Contact form WhatsApp message sent to admin', {
        name: contactData.name,
        email: contactData.email,
        adminNumber,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send contact form WhatsApp message', {
        name: contactData.name,
        email: contactData.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  },

  /**
   * Send auto-reply to contact form submitter
   */
  async sendContactAutoReply(to: string, name: string): Promise<any> {
    const message = `
👋 *Thank you for contacting MaxCash, ${name}!*

We've received your message and our team will get back to you shortly.

⏰ *Response time:* Usually within 1-2 hours

In the meantime, you can:
• Visit our website: https://maxcash.com
• Check our FAQ: https://maxcash.com/faq
• Apply for a loan: https://maxcash.com/apply

*Need immediate assistance?* Call us at +231 777 542 605

Have a great day! 😊
    `.trim();

    try {
      const result = await sendWhatsAppMessage({
        to,
        message,
      });

      logger.info('Auto-reply WhatsApp message sent', {
        to,
        name,
        messageId: result?.sid || 'unknown',
      });

      return result;
    } catch (error) {
      logger.error('Failed to send auto-reply WhatsApp message', {
        to,
        name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      // Don't throw - auto-reply failure shouldn't break the main flow
      return null;
    }
  },

  /**
   * Send a batch of messages
   */
  async sendBatchMessages(
    messages: { to: string; message: string }[]
  ): Promise<{ success: number; failed: number; errors: Error[] }> {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Error[],
    };

    for (const msg of messages) {
      try {
        await sendWhatsAppMessage({
          to: msg.to,
          message: msg.message,
        });
        results.success++;
      } catch (error) {
        results.failed++;
        if (error instanceof Error) {
          results.errors.push(error);
        }
        logger.error('Failed to send batch WhatsApp message', {
          to: msg.to,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    logger.info('Batch WhatsApp messages sent', {
      total: messages.length,
      success: results.success,
      failed: results.failed,
    });

    return results;
  },
};

// Export types for use in other services
export type { WhatsAppMessageOptions };

// Create a convenience object with all message templates
export const messageTemplates = {
  WELCOME: 'welcome',
  LOAN_APPROVED: 'loan_approved',
  LOAN_DISBURSED: 'loan_disbursed',
  LOAN_REJECTED: 'loan_rejected',
  LOAN_APPLICATION_RECEIVED: 'loan_application_received',
  PAYMENT_CONFIRMED: 'payment_confirmed',
  PAYMENT_OVERDUE: 'payment_overdue',
  PAYMENT_REMINDER: 'payment_reminder',
  CONTACT_AUTO_REPLY: 'contact_auto_reply',
} as const;

// Export a factory function for creating WhatsApp services
export const createWhatsAppService = (customConfig?: {
  adminNumber?: string;
  defaultCountryCode?: string;
}) => {
  // Override admin number if provided
  if (customConfig?.adminNumber) {
    process.env.ADMIN_WHATSAPP_NUMBER = customConfig.adminNumber;
  }

  return whatsappService;
};


// import { sendWhatsAppMessage, sendWhatsAppWelcome, sendWhatsAppLoanApproved } from '../adapters/whatsapp.adapter';

// export const whatsappService = {
//   sendMessage: sendWhatsAppMessage,
//   sendWelcome: sendWhatsAppWelcome,
//   sendLoanApproved: sendWhatsAppLoanApproved,

//   async sendLoanDisbursed(to: string, name: string, amount: number) {
//     return await sendWhatsAppMessage({
//       to,
//       message: `Hello ${name}, your loan of $${amount} has been disbursed to your account.`,
//       template: {
//         name: 'loan_disbursed',
//         parameters: {
//           name: name,
//           amount: amount.toString(),
//         },
//       },
//     });
//   },

//   async sendPaymentConfirmed(to: string, name: string, amount: number) {
//     return await sendWhatsAppMessage({
//       to,
//       message: `Hello ${name}, your payment of $${amount} has been confirmed.`,
//       template: {
//         name: 'payment_confirmed',
//         parameters: {
//           name: name,
//           amount: amount.toString(),
//         },
//       },
//     });
//   },

//   async sendPaymentOverdue(to: string, name: string, amount: number, days: number) {
//     return await sendWhatsAppMessage({
//       to,
//       message: `Hello ${name}, your payment of $${amount} is ${days} days overdue. Please make payment soon.`,
//       template: {
//         name: 'payment_overdue',
//         parameters: {
//           name: name,
//           amount: amount.toString(),
//           days: days.toString(),
//         },
//       },
//     });
//   },
// };
