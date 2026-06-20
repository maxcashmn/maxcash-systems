import { sendWhatsAppMessage, sendWhatsAppWelcome, sendWhatsAppLoanApproved } from '../adapters/whatsapp.adapter';

export const whatsappService = {
  sendMessage: sendWhatsAppMessage,
  sendWelcome: sendWhatsAppWelcome,
  sendLoanApproved: sendWhatsAppLoanApproved,

  async sendLoanDisbursed(to: string, name: string, amount: number) {
    return await sendWhatsAppMessage({
      to,
      message: `Hello ${name}, your loan of $${amount} has been disbursed to your account.`,
      template: {
        name: 'loan_disbursed',
        parameters: {
          name: name,
          amount: amount.toString(),
        },
      },
    });
  },

  async sendPaymentConfirmed(to: string, name: string, amount: number) {
    return await sendWhatsAppMessage({
      to,
      message: `Hello ${name}, your payment of $${amount} has been confirmed.`,
      template: {
        name: 'payment_confirmed',
        parameters: {
          name: name,
          amount: amount.toString(),
        },
      },
    });
  },

  async sendPaymentOverdue(to: string, name: string, amount: number, days: number) {
    return await sendWhatsAppMessage({
      to,
      message: `Hello ${name}, your payment of $${amount} is ${days} days overdue. Please make payment soon.`,
      template: {
        name: 'payment_overdue',
        parameters: {
          name: name,
          amount: amount.toString(),
          days: days.toString(),
        },
      },
    });
  },
};
