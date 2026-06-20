import { BaseRepository } from './baseRepository';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRow {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role: string;
  status: string;
  password_hash: string;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export class UserRepository extends BaseRepository<User> {
  protected tableName = 'users';
  protected mapToEntity(row: UserRow): User {
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      phoneNumber: row.phone_number,
      role: row.role,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE email = $1 AND deleted_at IS NULL`,
      [email]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  async getUserWithPassword(email: string): Promise<any | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE email = $1 AND deleted_at IS NULL`,
      [email]
    );
    return result.length > 0 ? result[0] : null;
  }

  async getUserWithPasswordById(id: string): Promise<any | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return result.length > 0 ? result[0] : null;
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
      [hashedPassword, userId]
    );
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET email_verified = true, updated_at = NOW() WHERE id = $1`,
      [userId]
    );
  }

  async updateStatus(userId: string, status: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, userId]
    );
  }
}
