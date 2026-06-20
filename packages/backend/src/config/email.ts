export const emailConfig = {
  serviceId: process.env.EMAILJS_SERVICE_ID || '',
  templateId: process.env.EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
  privateKey: process.env.EMAILJS_PRIVATE_KEY || '',
  fromEmail: process.env.EMAIL_FROM || 'noreply@maxcash.com',
  fromName: process.env.EMAIL_FROM_NAME || 'MaxCash Team',
  rateLimit: {
    maxPerMinute: 5,
    maxPerHour: 20,
    maxPerDay: 200,
  },
} as const;

export type EmailConfig = typeof emailConfig;
