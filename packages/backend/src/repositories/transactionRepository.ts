import { BaseRepository } from './baseRepository';
import { Transaction } from '@maxcash/shared';

interface TransactionRow {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
  description?: string;
  metadata?: any;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export class TransactionRepository extends BaseRepository<Transaction> {
  protected tableName = 'transactions';
  protected mapToEntity(row: TransactionRow): Transaction {
    return {
      id: row.id,
      userId: row.user_id,
      type: row.type,
      amount: row.amount,
      status: row.status,
      reference: row.reference,
      description: row.description,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findByReference(reference: string): Promise<Transaction | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE reference = $1`,
      [reference]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  async updateStatus(transactionId: string, status: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, transactionId]
    );
  }
}
