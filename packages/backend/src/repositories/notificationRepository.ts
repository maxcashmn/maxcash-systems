import { BaseRepository } from './baseRepository';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  channel: string;
  subject: string;
  content: string;
  status: string;
  sent_at?: Date;
  read_at?: Date;
  created_at: Date;
}

export class NotificationRepository extends BaseRepository<Notification> {
  protected tableName = 'notifications';
  protected mapToEntity(row: any): Notification {
    return {
      id: row.id,
      user_id: row.user_id,
      type: row.type,
      channel: row.channel,
      subject: row.subject,
      content: row.content,
      status: row.status,
      sent_at: row.sent_at,
      read_at: row.read_at,
      created_at: row.created_at,
    };
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async findUnreadByUserId(userId: string): Promise<Notification[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 AND status != 'read' ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async markAsSent(notificationId: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = 'sent', sent_at = NOW() WHERE id = $1`,
      [notificationId]
    );
  }

  async markAsRead(notificationId: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET status = 'read', read_at = NOW() WHERE id = $1`,
      [notificationId]
    );
  }
}
