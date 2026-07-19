export * from './app';
export * from './auth';
export * from './database';
export * from './email';
export * from './whatsapp';

import { getAppConfig } from './app';
import { getAuthConfig } from './auth';
import { getDatabaseConfig } from './database';
import { getEmailConfig } from './email';
import { getWhatsAppConfig } from './whatsapp';

import type { Bindings } from '../types';

export function getConfig(env: Partial<Bindings> = {}) {
  return {
    app: getAppConfig(env),
    auth: getAuthConfig(env),
    database: getDatabaseConfig(env),
    email: getEmailConfig(env),
    whatsapp: getWhatsAppConfig(env),
  };
}

export type Config = ReturnType<typeof getConfig>;