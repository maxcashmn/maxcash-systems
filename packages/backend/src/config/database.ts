export const databaseConfig = {
  url: process.env.DATABASE_URL || '',
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '10'),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000'),
  },
  ssl: {
    require: true,
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
  migrations: {
    table: 'migrations',
    directory: './sql/migrations',
  },
} as const;

export type DatabaseConfig = typeof databaseConfig;
