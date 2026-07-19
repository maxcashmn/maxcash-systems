// src/config/email.ts

import type { Bindings } from '../types';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
  fromEmail: string;
  fromName: string;
  rateLimit: {
    maxPerMinute: number;
    maxPerHour: number;
    maxPerDay: number;
  };
}

export function getEmailConfig(
  env: Partial<Bindings> = {}
): EmailConfig {
  return {
    serviceId: env.EMAILJS_SERVICE_ID ?? '',
    templateId: env.EMAILJS_TEMPLATE_ID ?? '',
    publicKey: env.EMAILJS_PUBLIC_KEY ?? '',
    privateKey: env.EMAILJS_PRIVATE_KEY ?? '',

    fromEmail:
      env.EMAIL_FROM ??
      'noreply@maxcash.com',

    fromName:
      env.EMAIL_FROM_NAME ??
      'MaxCash Team',

    rateLimit: {
      maxPerMinute: 5,
      maxPerHour: 20,
      maxPerDay: 200,
    },
  };
}





// // src/config/email.ts

// import type { Bindings } from '../types';


// export interface EmailConfig {
//   serviceId: string;
//   templateId: string;
//   publicKey: string;
//   privateKey: string;
//   fromEmail: string;
//   fromName: string;

//   rateLimit: {
//     maxPerMinute: number;
//     maxPerHour: number;
//     maxPerDay: number;
//   };
// }


// function getEnv(
//   key: keyof Bindings
// ): string {

//   if (typeof process !== 'undefined') {
//     return process.env[key] ?? '';
//   }

//   return '';
// }


// export const emailConfig: EmailConfig = {

//   serviceId:
//     getEnv('EMAILJS_SERVICE_ID'),

//   templateId:
//     getEnv('EMAILJS_TEMPLATE_ID'),

//   publicKey:
//     getEnv('EMAILJS_PUBLIC_KEY'),

//   privateKey:
//     getEnv('EMAILJS_PRIVATE_KEY'),


//   fromEmail:
//     getEnv('EMAIL_FROM') ||
//     'noreply@maxcash.com',


//   fromName:
//     getEnv('EMAIL_FROM_NAME') ||
//     'MaxCash Team',


//   rateLimit: {
//     maxPerMinute: 5,
//     maxPerHour: 20,
//     maxPerDay: 200,
//   },

// };



// // In Cloudflare Workers, environment variables are directly available via `env`
// // @ts-ignore - env is available in Workers environment
// const getEnv = (key: string): string => {
//   // @ts-ignore - env is available in Workers environment
//   if (typeof env !== 'undefined' && env[key]) {
//     // @ts-ignore - env is available in Workers environment
//     return env[key];
//   }
//   // Fallback for local development with process.env
//   // @ts-ignore - process is available in Node.js environment
//   if (typeof process !== 'undefined' && process.env && process.env[key]) {
//     // @ts-ignore - process is available in Node.js environment
//     return process.env[key] as string;
//   }
//   return '';
// };

// export const emailConfig = {
//   serviceId: getEnv('EMAILJS_SERVICE_ID'),
//   templateId: getEnv('EMAILJS_TEMPLATE_ID'),
//   publicKey: getEnv('EMAILJS_PUBLIC_KEY'),
//   privateKey: getEnv('EMAILJS_PRIVATE_KEY'),
//   fromEmail: getEnv('EMAIL_FROM') || 'noreply@maxcash.com',
//   fromName: getEnv('EMAIL_FROM_NAME') || 'MaxCash Team',
//   rateLimit: {
//     maxPerMinute: 5,
//     maxPerHour: 20,
//     maxPerDay: 200,
//   },
// } as const;

// export type EmailConfig = typeof emailConfig;
