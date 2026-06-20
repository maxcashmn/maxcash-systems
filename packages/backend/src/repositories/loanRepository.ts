import { BaseRepository } from './baseRepository';

export interface Loan {
  id: string;
  user_id: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  purpose: string;
  status: string;
  approved_by?: string;
  approved_at?: Date;
  disbursed_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export class LoanRepository extends BaseRepository<Loan> {
  protected tableName = 'loans';
  protected mapToEntity(row: any): Loan {
    return {
      id: row.id,
      user_id: row.user_id,
      amount: row.amount,
      interest_rate: row.interest_rate,
      term_months: row.term_months,
      purpose: row.purpose,
      status: row.status,
      approved_by: row.approved_by,
      approved_at: row.approved_at,
      disbursed_at: row.disbursed_at,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findActiveLoans(): Promise<Loan[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE status IN ('active', 'disbursed') AND deleted_at IS NULL`
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
      `UPDATE ${this.tableName} SET status = 'approved', approved_by = $1, approved_at = NOW(), updated_at = NOW() WHERE id = $2`,
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
