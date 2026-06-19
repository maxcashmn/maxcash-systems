export const servicesConfig = {
  // EmailJS - Free Tier
  emailjs: {
    maxEmailsPerMonth: 200,
    maxBatchSize: 50,
    rateLimit: {
      perMinute: 5,
      perHour: 20,
      perDay: 200,
    },
  },
  
  // WhatsApp Business - Free Tier
  whatsapp: {
    maxMessagesPerDay: 1000,
    maxBatchSize: 100,
    rateLimit: {
      perMinute: 10,
      perHour: 100,
      perDay: 1000,
    },
  },
} as const;

export type ServicesConfig = typeof servicesConfig;
