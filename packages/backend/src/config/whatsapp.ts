// src/config/whatsapp.ts

import type { Bindings } from '../types';

export function getWhatsAppConfig(
  env: Partial<Bindings> = {}
) {
  const getEnv = (
    key: keyof Bindings,
    fallback = ''
  ): string =>
    String(env[key] ?? process.env[key] ?? fallback);

  return {
    phoneNumberId: getEnv(
      'WHATSAPP_PHONE_NUMBER_ID'
    ),

    accessToken: getEnv(
      'WHATSAPP_ACCESS_TOKEN'
    ),

    businessAccountId: getEnv(
      'WHATSAPP_BUSINESS_ACCOUNT_ID'
    ),

    apiVersion: 'v25.0',

    baseUrl:
      'https://graph.facebook.com',

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
}

export type WhatsAppConfig =
  ReturnType<typeof getWhatsAppConfig>;