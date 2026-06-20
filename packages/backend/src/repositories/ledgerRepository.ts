import { BaseRepository } from './baseRepository';

export interface LedgerEntry {
  id: string;
  user_id: string;
  transaction_id: string;
  type: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  description?: string;
  metadata?: any;
  created_at: Date;
}

export class LedgerRepository extends BaseRepository<LedgerEntry> {
  protected tableName = 'ledger_entries';
  protected mapToEntity(row: any): LedgerEntry {
    return {
      id: row.id,
      user_id: row.user_id,
      transaction_id: row.transaction_id,
      type: row.type,
      amount: row.amount,
      balance_before: row.balance_before,
      balance_after: row.balance_after,
      description: row.description,
      metadata: row.metadata,
      created_at: row.created_at,
    };
  }

  async findByUserId(userId: string): Promise<LedgerEntry[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findByTransactionId(transactionId: string): Promise<LedgerEntry[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE transaction_id = $1`,
      [transactionId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }
}
