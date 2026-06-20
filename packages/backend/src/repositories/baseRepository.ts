import { query as dbQuery } from '../db';

export interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export abstract class BaseRepository<T> implements Repository<T> {
  protected abstract tableName: string;
  protected abstract mapToEntity(row: any): T;

  // Public query method for child classes to use
  async query(sql: string, params?: any[]): Promise<any[]> {
    return dbQuery(sql, params);
  }

  async findById(id: string): Promise<T | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  async findAll(): Promise<T[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE deleted_at IS NULL`
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async create(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.join(', ');
    
    const result = await this.query(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return this.mapToEntity(result[0]);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    
    const result = await this.query(
      `UPDATE ${this.tableName} SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return this.mapToEntity(result[0]);
  }

  async delete(id: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET deleted_at = NOW() WHERE id = $1`,
      [id]
    );
  }

  async exists(id: string): Promise<boolean> {
    const result = await this.query(
      `SELECT EXISTS(SELECT 1 FROM ${this.tableName} WHERE id = $1 AND deleted_at IS NULL)`,
      [id]
    );
    return result[0].exists;
  }

  async count(filter?: Record<string, any>): Promise<number> {
    let whereClause = '';
    let values: any[] = [];
    
    if (filter) {
      const keys = Object.keys(filter);
      whereClause = ' WHERE ' + keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
      values = Object.values(filter);
    }
    
    const result = await this.query(
      `SELECT COUNT(*) FROM ${this.tableName}${whereClause}`,
      values
    );
    return parseInt(result[0].count);
  }
}
