import { BaseRepository } from './baseRepository';

export interface Loan {
  id: string;
  application_id: string;
  borrower_id: string;
  approved_by?: string;
  principal_amount: number;
  interest_rate: number;
  currency: string;
  status: string;
  risk_score?: number;
  total_repaid?: number;
  remaining_balance?: number;
  disbursed_at: Date;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
}

export class LoanRepository extends BaseRepository<Loan> {
  protected tableName = 'loans';
  protected mapToEntity(row: any): Loan {
    return {
      id: row.id,
      application_id: row.application_id,
      borrower_id: row.borrower_id,
      approved_by: row.approved_by,
      principal_amount: row.principal_amount,
      interest_rate: row.interest_rate,
      currency: row.currency || 'USD',
      status: row.status,
      risk_score: row.risk_score,
      total_repaid: row.total_repaid || 0,
      remaining_balance: row.remaining_balance || row.principal_amount,
      disbursed_at: row.disbursed_at,
      due_date: row.due_date,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async create(data: any): Promise<Loan> {
    // Set default values for required columns
    const now = new Date();
    const dueDate = data.due_date || new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days default
    
    const dbData = {
      id: data.id,
      application_id: data.application_id,
      borrower_id: data.borrower_id,
      principal_amount: data.principal_amount,
      interest_rate: data.interest_rate,
      currency: data.currency || 'USD',
      status: data.status || 'pending',
      disbursed_at: data.disbursed_at || now,
      due_date: data.due_date || dueDate,
      created_at: now,
      updated_at: now,
    };

    const keys = Object.keys(dbData);
    const values = Object.values(dbData);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');

    const result = await this.query(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return this.mapToEntity(result[0]);
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE borrower_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findActiveLoans(): Promise<Loan[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE status IN ('active', 'disbursed')`
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async updateStatus(loanId: string, status: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, loanId]
    );
  }

  async approveLoan(loanId: string, approvedBy: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = 'approved', approved_by = $1, updated_at = NOW() WHERE id = $2`,
      [approvedBy, loanId]
    );
  }

  async disburseLoan(loanId: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = 'disbursed', disbursed_at = NOW(), updated_at = NOW() WHERE id = $1`,
      [loanId]
    );
  }
}
