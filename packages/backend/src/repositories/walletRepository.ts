// src/repositories/walletRepository.ts

import { BaseRepository } from './baseRepository';
import { Wallet } from '@maxcash/shared';

interface WalletRow {
  id: string;
  borrower_id: string;      // Changed from user_id
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
      borrowerId: row.borrower_id,  // Changed from userId
      balance: row.balance,
      currency: row.currency,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Create a new wallet
   */
  async create(data: any): Promise<Wallet> {
    const result = await this.query(
      `INSERT INTO wallets (id, borrower_id, balance, currency, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [
        data.id,
        data.borrowerId || data.borrower_id,
        data.balance || 0,
        data.currency || 'USD',
        data.status || 'active',
      ]
    );
    return this.mapToEntity(result[0]);
  }

  /**
   * Update wallet details
   */
  async update(walletId: string, data: any): Promise<Wallet> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.balance !== undefined) {
      fields.push(`balance = $${paramIndex}`);
      values.push(data.balance);
      paramIndex++;
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramIndex}`);
      values.push(data.status);
      paramIndex++;
    }
    if (data.currency !== undefined) {
      fields.push(`currency = $${paramIndex}`);
      values.push(data.currency);
      paramIndex++;
    }

    fields.push(`updated_at = NOW()`);

    const result = await this.query(
      `UPDATE ${this.tableName} 
       SET ${fields.join(', ')} 
       WHERE id = $${paramIndex} 
       RETURNING *`,
      [...values, walletId]
    );

    return this.mapToEntity(result[0]);
  }

  /**
   * Find wallet by borrower ID
   */
  async findByBorrowerId(borrowerId: string): Promise<Wallet | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE borrower_id = $1 
       AND (deleted_at IS NULL OR deleted_at > NOW())`,
      [borrowerId]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  /**
   * Find wallet by ID
   */
  async findById(id: string): Promise<Wallet | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE id = $1 
       AND (deleted_at IS NULL OR deleted_at > NOW())`,
      [id]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  /**
   * Update wallet balance
   */
  async updateBalance(walletId: string, newBalance: number): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} 
       SET balance = $1, updated_at = NOW() 
       WHERE id = $2`,
      [newBalance, walletId]
    );
  }

  /**
   * Increment wallet balance (add amount)
   */
  async incrementBalance(walletId: string, amount: number): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} 
       SET balance = balance + $1, updated_at = NOW() 
       WHERE id = $2`,
      [amount, walletId]
    );
  }

  /**
   * Decrement wallet balance (subtract amount)
   */
  async decrementBalance(walletId: string, amount: number): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} 
       SET balance = balance - $1, updated_at = NOW() 
       WHERE id = $2`,
      [amount, walletId]
    );
  }

  /**
   * Get all wallets (admin only)
   */
  async getAllWallets(limit: number = 100, offset: number = 0): Promise<Wallet[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE (deleted_at IS NULL OR deleted_at > NOW()) 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  /**
   * Get wallet statistics
   */
  async getStats(): Promise<{
    totalWallets: number;
    totalBalance: number;
    activeWallets: number;
  }> {
    const result = await this.query(
      `SELECT 
        COUNT(*) as total,
        SUM(balance) as total_balance,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active
       FROM ${this.tableName} 
       WHERE (deleted_at IS NULL OR deleted_at > NOW())`
    );

    return {
      totalWallets: parseInt(result[0]?.total || '0'),
      totalBalance: parseFloat(result[0]?.total_balance || '0'),
      activeWallets: parseInt(result[0]?.active || '0'),
    };
  }

  /**
   * Get wallets by status
   */
  async findByStatus(status: string): Promise<Wallet[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE status = $1 
       AND (deleted_at IS NULL OR deleted_at > NOW()) 
       ORDER BY created_at DESC`,
      [status]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  /**
   * Soft delete a wallet
   */
  async softDelete(walletId: string): Promise<boolean> {
    const result = await this.query(
      `UPDATE ${this.tableName} 
       SET deleted_at = NOW(), updated_at = NOW() 
       WHERE id = $1 
       RETURNING id`,
      [walletId]
    );
    return result.length > 0;
  }
}