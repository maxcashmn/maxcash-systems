import { BaseRepository } from './baseRepository';

interface RefreshToken {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  revoked: boolean;
  created_at: Date;
  updated_at: Date;
}

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  protected tableName = 'refresh_tokens';
  protected mapToEntity(row: any): RefreshToken {
    return {
      id: row.id,
      user_id: row.user_id,
      token: row.token,
      expires_at: row.expires_at,
      revoked: row.revoked,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE token = $1 AND revoked = false`,
      [token]
    );
    return result.length > 0 ? this.mapToEntity(result[0]) : null;
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE user_id = $1 AND revoked = false ORDER BY created_at DESC`,
      [userId]
    );
    return result.map((row: any) => this.mapToEntity(row));
  }

  async revokeToken(token: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET revoked = true, updated_at = NOW() WHERE token = $1`,
      [token]
    );
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.query(
      `UPDATE ${this.tableName} SET revoked = true, updated_at = NOW() WHERE user_id = $1`,
      [userId]
    );
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.query(
      `DELETE FROM ${this.tableName} WHERE expires_at < NOW() OR revoked = true`
    );
  }
}
