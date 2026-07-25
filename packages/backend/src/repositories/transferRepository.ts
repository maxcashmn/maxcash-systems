import { BaseRepository } from './baseRepository';

export interface Transfer {
  id: string;
  from_borrower_id: string;    // Changed from from_user_id
  to_borrower_id: string;      // Changed from to_user_id
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
      from_borrower_id: row.from_borrower_id,
      to_borrower_id: row.to_borrower_id,
      amount: row.amount,
      status: row.status,
      reference: row.reference,
      description: row.description,
      created_at: row.created_at,
      completed_at: row.completed_at,
    };
  }

  /**
   * Find transfers by borrower ID (either as sender or recipient)
   */
  async findByBorrowerId(borrowerId: string): Promise<Transfer[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE from_borrower_id = $1 OR to_borrower_id = $1 
       AND (deleted_at IS NULL OR deleted_at > NOW()) 
       ORDER BY created_at DESC`,
      [borrowerId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  /**
   * Find transfer by ID
   */
  async findById(id: string): Promise<Transfer | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE id = $1 
       AND (deleted_at IS NULL OR deleted_at > NOW())`,
      [id]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  /**
   * Find transfer by reference
   */
  async findByReference(reference: string): Promise<Transfer | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} 
       WHERE reference = $1 
       AND (deleted_at IS NULL OR deleted_at > NOW())`,
      [reference]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  /**
   * Update transfer status
   */
  async updateStatus(transferId: string, status: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} 
       SET status = $1, 
           completed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE completed_at END,
           updated_at = NOW()
       WHERE id = $2`,
      [status, transferId]
    );
  }

  /**
   * Create a new transfer
   */
  async create(data: any): Promise<Transfer> {
    const result = await this.query(
      `INSERT INTO transfers (
        id, from_borrower_id, to_borrower_id, amount, status, 
        reference, description, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *`,
      [
        data.id,
        data.from_borrower_id || data.fromBorrowerId,
        data.to_borrower_id || data.toBorrowerId,
        data.amount,
        data.status || 'pending',
        data.reference,
        data.description || null,
      ]
    );
    return this.mapToEntity(result[0]);
  }

  /**
   * Get transfers by status
   */
  async findByStatus(status: string): Promise<Transfer[]> {
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
   * Soft delete a transfer
   */
  async softDelete(transferId: string): Promise<boolean> {
    const result = await this.query(
      `UPDATE ${this.tableName} 
       SET deleted_at = NOW(), updated_at = NOW() 
       WHERE id = $1 
       RETURNING id`,
      [transferId]
    );
    return result.length > 0;
  }
}