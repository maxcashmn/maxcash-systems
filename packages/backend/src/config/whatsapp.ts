export const whatsappConfig = {
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
  apiVersion: 'v25.0',
  baseUrl: 'https://graph.facebook.com',
  rateLimit: {
    maxPerMinute: 10,
    maxPerHour: 100,
    maxPerDay: 1000,
  },
  templates: {
    welcome: 'welcome_message',
    loanApproved: 'loan_approved',
    loanRejected: 'loan_rejected',
    paymentConfirmed: 'payment_confirmed',
    paymentOverdue: 'payment_overdue',
  },
} as const;

export type WhatsAppConfig = typeof whatsappConfig;
