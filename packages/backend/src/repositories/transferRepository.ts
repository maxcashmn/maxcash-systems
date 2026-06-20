import { BaseRepository } from './baseRepository';

export interface Transfer {
  id: string;
  from_user_id: string;
  to_user_id: string;
  amount: number;
  status: string;
  reference: string;
  description?: string;
  created_at: Date;
  completed_at?: Date;
}

export class TransferRepository extends BaseRepository<Transfer> {
  protected tableName = 'transfers';
  protected mapToEntity(row: any): Transfer {
    return {
      id: row.id,
      from_user_id: row.from_user_id,
      to_user_id: row.to_user_id,
      amount: row.amount,
      status: row.status,
      reference: row.reference,
      description: row.description,
      created_at: row.created_at,
      completed_at: row.completed_at,
    };
  }

  async findByUserId(userId: string): Promise<Transfer[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE from_user_id = $1 OR to_user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findByReference(reference: string): Promise<Transfer | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE reference = $1`,
      [reference]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  async updateStatus(transferId: string, status: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = $1, completed_at = NOW() WHERE id = $2`,
      [status, transferId]
    );
  }
}
