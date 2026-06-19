export const serverlessConfig = {
  // Cloudflare Workers - Free Tier Limits
  workers: {
    maxRequestsPerDay: 100000,
    maxCpuTime: 10,
    maxDuration: 30,
    maxMemory: 128,
    timeout: 30000,
  },
  
  // Neon Serverless PostgreSQL - Free Tier
  neon: {
    maxConnections: 10,
    maxStorage: 0.5,
    maxBandwidth: 10,
    connectionTimeout: 10000,
    idleTimeout: 30000,
    poolSize: 5,
  },
  
  // Sanity CMS - Free Tier
  sanity: {
    maxApiRequests: 100000,
    maxUsers: 3,
    maxDocuments: 10000,
    dataset: 'production',
    useCdn: true,
  },
  
  // Cloudflare Pages - Free Tier
  pages: {
    maxBuildsPerMonth: 500,
    maxBuildTime: 300,
    maxAssetSize: 25 * 1024 * 1024,
  },
} as const;

export type ServerlessConfig = typeof serverlessConfig;
