import { BaseRepository } from './baseRepository';

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  resource: string;
  resource_id?: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

export class AuditRepository extends BaseRepository<AuditLog> {
  protected tableName = 'audit_logs';
  protected mapToEntity(row: any): AuditLog {
    return {
      id: row.id,
      user_id: row.user_id,
      action: row.action,
      resource: row.resource,
      resource_id: row.resource_id,
      details: row.details,
      ip_address: row.ip_address,
      user_agent: row.user_agent,
      created_at: row.created_at,
    };
  }

  async findByUserId(userId: string): Promise<AuditLog[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findByResource(resource: string, resourceId: string): Promise<AuditLog[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE resource = $1 AND resource_id = $2 ORDER BY created_at DESC`,
      [resource, resourceId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findByAction(action: string): Promise<AuditLog[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE action = $1 ORDER BY created_at DESC`,
      [action]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }
}
