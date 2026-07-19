import { BaseRepository } from './baseRepository';
import { generateId } from '../utils/helpers';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  role: string;
  status: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserRow {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string | null;
  role: string;
  status: string;
  password_hash: string;
  email_verified: boolean;
  phone_verified: boolean;
  email_verification_token?: string | null;
  email_verification_expires?: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface CreateUserData {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  password_hash: string;
  role?: string;
  status?: string;
  email_verified?: boolean;
  phone_verified?: boolean;
  email_verification_token?: string | null;
  email_verification_expires?: Date | null;
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
      emailVerified: row.email_verified,
      phoneVerified: row.phone_verified,
      emailVerificationToken: row.email_verification_token,
      emailVerificationExpires: row.email_verification_expires,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Create user account.
   */
  async create(data: CreateUserData): Promise<User> {
    const userData = {
      id: data.id ?? generateId(),
      email: data.email.toLowerCase().trim(),
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      phone_number: data.phoneNumber ?? null,
      password_hash: data.password_hash,
      role: data.role ?? 'borrower',
      status: data.status ?? 'pending',
      email_verified: data.email_verified ?? false,
      phone_verified: data.phone_verified ?? false,
      email_verification_token:
        data.email_verification_token ?? null,
      email_verification_expires:
        data.email_verification_expires ?? null,
    };

    const columns = Object.keys(userData);
    const values = Object.values(userData);

    const placeholders = columns
      .map((_, index) => `$${index + 1}`)
      .join(', ');

    const result = await this.query(
      `
      INSERT INTO ${this.tableName}
      (${columns.join(', ')})
      VALUES (${placeholders})
      RETURNING *
      `,
      values
    );

    return this.mapToEntity(result[0]);
  }

  /**
   * Find user by email.
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.query(
      `
      SELECT *
      FROM ${this.tableName}
      WHERE LOWER(email)=LOWER($1)
      AND deleted_at IS NULL
      `,
      [email]
    );

    return result.length
      ? this.mapToEntity(result[0])
      : null;
  }

  /**
   * Find user by ID.
   */
  async findById(id: string): Promise<User | null> {
    const result = await this.query(
      `
      SELECT *
      FROM ${this.tableName}
      WHERE id=$1
      AND deleted_at IS NULL
      `,
      [id]
    );

    return result.length
      ? this.mapToEntity(result[0])
      : null;
  }

  /**
   * Authentication lookup with password.
   */
  async getUserWithPassword(
    email: string
  ): Promise<UserRow | null> {
    const result = await this.query(
      `
      SELECT *
      FROM ${this.tableName}
      WHERE LOWER(email)=LOWER($1)
      AND deleted_at IS NULL
      `,
      [email]
    );

    return result[0] ?? null;
  }

  /**
   * Authentication lookup by ID.
   */
  async getUserWithPasswordById(
    id: string
  ): Promise<UserRow | null> {
    const result = await this.query(
      `
      SELECT *
      FROM ${this.tableName}
      WHERE id=$1
      AND deleted_at IS NULL
      `,
      [id]
    );

    return result[0] ?? null;
  }

  /**
   * Update password.
   */
  async updatePassword(
    userId: string,
    hashedPassword: string
  ): Promise<void> {
    await this.query(
      `
      UPDATE ${this.tableName}
      SET password_hash=$1,
          updated_at=NOW()
      WHERE id=$2
      `,
      [
        hashedPassword,
        userId,
      ]
    );
  }

  /**
   * Save email verification token.
   */
  async setVerificationToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await this.query(
      `
      UPDATE ${this.tableName}
      SET email_verification_token=$1,
          email_verification_expires=$2,
          updated_at=NOW()
      WHERE id=$3
      `,
      [
        token,
        expiresAt,
        userId,
      ]
    );
  }

  /**
   * Find user by verification token.
   */
  async findByVerificationToken(
    token: string
  ): Promise<UserRow | null> {
    const result = await this.query(
      `
      SELECT *
      FROM ${this.tableName}
      WHERE email_verification_token=$1
      AND email_verification_expires > NOW()
      AND deleted_at IS NULL
      `,
      [token]
    );

    return result[0] ?? null;
  }

  /**
   * Verify email address.
   */
  async verifyEmail(userId: string): Promise<void> {
    await this.query(
      `
      UPDATE ${this.tableName}
      SET email_verified=true,
          email_verification_token=NULL,
          email_verification_expires=NULL,
          status='active',
          updated_at=NOW()
      WHERE id=$1
      `,
      [userId]
    );
  }

  /**
   * Remove verification token.
   */
  async clearVerificationToken(
    userId: string
  ): Promise<void> {
    await this.query(
      `
      UPDATE ${this.tableName}
      SET email_verification_token=NULL,
          email_verification_expires=NULL,
          updated_at=NOW()
      WHERE id=$1
      `,
      [userId]
    );
  }

  /**
   * Update user status.
   */
  async updateStatus(
    userId: string,
    status: string
  ): Promise<void> {
    await this.query(
      `
      UPDATE ${this.tableName}
      SET status=$1,
          updated_at=NOW()
      WHERE id=$2
      `,
      [
        status,
        userId,
      ]
    );
  }
}




// import { BaseRepository } from './baseRepository';
// import { generateId } from '../utils/helpers';

// export interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber?: string;
//   role: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface UserRow {
//   id: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   phone_number?: string;
//   role: string;
//   status: string;
//   password_hash: string;
//   email_verified: boolean;
//   phone_verified: boolean;
//   created_at: Date;
//   updated_at: Date;
//   deleted_at?: Date;
// }

// export class UserRepository extends BaseRepository<User> {
//   protected tableName = 'users';
//   protected mapToEntity(row: UserRow): User {
//     return {
//       id: row.id,
//       email: row.email,
//       firstName: row.first_name,
//       lastName: row.last_name,
//       phoneNumber: row.phone_number,
//       role: row.role,
//       status: row.status,
//       createdAt: row.created_at,
//       updatedAt: row.updated_at,
//     };
//   }

//   // Override create method to handle snake_case columns
//   async create(data: any): Promise<User> {
//     // Map camelCase to snake_case for database
//     const dbData: any = {
//       id: data.id || generateId(),
//       email: data.email,
//       first_name: data.firstName,
//       last_name: data.lastName,
//       role: data.role || 'borrower',
//       status: data.status || 'pending',
//     };
    
//     // Add optional fields if present
//     if (data.phoneNumber) dbData.phone_number = data.phoneNumber;
//     if (data.password_hash) dbData.password_hash = data.password_hash;
//     if (data.email_verified !== undefined) dbData.email_verified = data.email_verified;
//     if (data.phone_verified !== undefined) dbData.phone_verified = data.phone_verified;
    
//     const keys = Object.keys(dbData);
//     const values = Object.values(dbData);
//     const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
//     const columns = keys.join(', ');
    
//     const result = await this.query(
//       `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`,
//       values
//     );
//     return this.mapToEntity(result[0]);
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     const result = await this.query(
//       `SELECT * FROM ${this.tableName} WHERE email = $1 AND deleted_at IS NULL`,
//       [email]
//     );
//     return result.length > 0 ? this.mapToEntity(result[0]) : null;
//   }

//   async getUserWithPassword(email: string): Promise<any | null> {
//     const result = await this.query(
//       `SELECT * FROM ${this.tableName} WHERE email = $1 AND deleted_at IS NULL`,
//       [email]
//     );
//     return result.length > 0 ? result[0] : null;
//   }

//   async getUserWithPasswordById(id: string): Promise<any | null> {
//     const result = await this.query(
//       `SELECT * FROM ${this.tableName} WHERE id = $1 AND deleted_at IS NULL`,
//       [id]
//     );
//     return result.length > 0 ? result[0] : null;
//   }

//   async updatePassword(userId: string, hashedPassword: string): Promise<void> {
//     await this.query(
//       `UPDATE ${this.tableName} SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
//       [hashedPassword, userId]
//     );
//   }

//   async verifyEmail(userId: string): Promise<void> {
//     await this.query(
//       `UPDATE ${this.tableName} SET email_verified = true, updated_at = NOW() WHERE id = $1`,
//       [userId]
//     );
//   }

//   async updateStatus(userId: string, status: string): Promise<void> {
//     await this.query(
//       `UPDATE ${this.tableName} SET status = $1, updated_at = NOW() WHERE id = $2`,
//       [status, userId]
//     );
//   }
// }
