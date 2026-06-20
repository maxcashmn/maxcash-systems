import { BaseRepository } from './baseRepository';
import { Wallet } from '@maxcash/shared';

interface WalletRow {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export class WalletRepository extends BaseRepository<Wallet> {
  protected tableName = 'wallets';
  protected mapToEntity(row: WalletRow): Wallet {
    return {
      id: row.id,
      userId: row.user_id,
      balance: row.balance,
      currency: row.currency,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 AND deleted_at IS NULL`,
      [userId]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  async updateBalance(walletId: string, newBalance: number): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET balance = $1, updated_at = NOW() WHERE id = $2`,
      [newBalance, walletId]
    );
  }

  async incrementBalance(walletId: string, amount: number): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET balance = balance + $1, updated_at = NOW() WHERE id = $2`,
      [amount, walletId]
    );
  }

  async decrementBalance(walletId: string, amount: number): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET balance = balance - $1, updated_at = NOW() WHERE id = $2`,
      [amount, walletId]
    );
  }
}
