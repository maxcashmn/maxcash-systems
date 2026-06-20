export * from './app';
export * from './auth';
export * from './database';
export * from './email';
export * from './whatsapp';

// Central config object
import { appConfig } from './app';
import { authConfig } from './auth';
import { databaseConfig } from './database';
import { emailConfig } from './email';
import { whatsappConfig } from './whatsapp';

export const config = {
  app: appConfig,
  auth: authConfig,
  database: databaseConfig,
  email: emailConfig,
  whatsapp: whatsappConfig,
};

export type Config = typeof config;
