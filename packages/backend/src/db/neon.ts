import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { databaseConfig } from '../config';

let sql: NeonQueryFunction<any, any> | null = null;

export function getDb() {
  if (!sql) {
    if (!databaseConfig.url) {
      throw new Error('DATABASE_URL is not set');
    }
    sql = neon(databaseConfig.url);
  }
  return sql;
}

export async function query<T = any>(
  queryString: string,
  params?: any[]
): Promise<T[]> {
  const db = getDb();
  try {
    const result = await db(queryString, params);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

export async function transaction<T>(
  callback: (db: NeonQueryFunction<any, any>) => Promise<T>
): Promise<T> {
  const db = getDb();
  try {
    return await callback(db);
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

export default { getDb, query, transaction };
