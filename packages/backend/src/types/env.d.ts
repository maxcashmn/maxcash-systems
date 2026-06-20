declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Database
      DATABASE_URL: string;
      DB_POOL_MAX?: string;
      DB_IDLE_TIMEOUT?: string;
      DB_CONNECTION_TIMEOUT?: string;

      // Authentication
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_EXPIRES_IN?: string;
      JWT_REFRESH_EXPIRES_IN?: string;

      // EmailJS
      EMAILJS_SERVICE_ID: string;
      EMAILJS_TEMPLATE_ID: string;
      EMAILJS_PUBLIC_KEY: string;
      EMAILJS_PRIVATE_KEY?: string;
      EMAIL_FROM?: string;
      EMAIL_FROM_NAME?: string;

      // WhatsApp
      WHATSAPP_PHONE_NUMBER_ID: string;
      WHATSAPP_ACCESS_TOKEN: string;
      WHATSAPP_BUSINESS_ACCOUNT_ID: string;

      // Sanity
      SANITY_PROJECT_ID: string;
      SANITY_DATASET?: string;
      SANITY_API_TOKEN: string;

      // Cloudflare
      CLOUDFLARE_API_TOKEN: string;
      CLOUDFLARE_ACCOUNT_ID: string;

      // Application
      NODE_ENV: 'development' | 'staging' | 'production';
      PORT?: string;
      CORS_ORIGINS?: string;
      FRONTEND_URL?: string;

      // Payment
      PAYMENT_API_KEY?: string;
      PAYMENT_BASE_URL?: string;
    }
  }
}

export {};
