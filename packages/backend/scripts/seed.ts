import { neon } from '@neondatabase/serverless';
import { hashSync, genSaltSync } from 'bcryptjs';
import { randomUUID } from 'crypto';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

interface SeedUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
}

const TEST_USERS: SeedUser[] = [
  {
    email: 'admin@maxcash.com',
    password: 'admin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phoneNumber: '+1234567890',
  },
  {
    email: 'manager@maxcash.com',
    password: 'manager123!',
    firstName: 'Manager',
    lastName: 'User',
    role: 'manager',
    phoneNumber: '+1234567891',
  },
  {
    email: 'auditor@maxcash.com',
    password: 'auditor123!',
    firstName: 'Auditor',
    lastName: 'User',
    role: 'auditor',
    phoneNumber: '+1234567892',
  },
  {
    email: 'borrower@maxcash.com',
    password: 'borrower123!',
    firstName: 'Borrower',
    lastName: 'User',
    role: 'borrower',
    phoneNumber: '+1234567893',
  },
  {
    email: 'john@maxcash.com',
    password: 'password123!',
    firstName: 'John',
    lastName: 'Doe',
    role: 'borrower',
    phoneNumber: '+1234567894',
  },
];

async function seed() {
  console.log('🚀 Starting database seed...\n');

  const salt = genSaltSync(10);

  for (const user of TEST_USERS) {
    const id = randomUUID();
    const passwordHash = hashSync(user.password, salt);

    // Check if user already exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${user.email}
    `;

    if (existing.length > 0) {
      console.log(`⏭️  User ${user.email} already exists, skipping`);
      continue;
    }

    try {
      await sql`
        INSERT INTO users (
          id, email, first_name, last_name, phone_number,
          password_hash, role, status, email_verified,
          phone_verified, created_at, updated_at
        ) VALUES (
          ${id}, ${user.email}, ${user.firstName}, ${user.lastName},
          ${user.phoneNumber ?? null}, ${passwordHash}, ${user.role},
          'active', true, true, NOW(), NOW()
        )
      `;
      console.log(`✅ Created ${user.role}: ${user.email} / ${user.password}`);
    } catch (error) {
      console.error(`❌ Failed to create ${user.email}:`, error);
    }
  }

  console.log('\n✅ Seed completed!');
  console.log('\n📋 Test Users:');
  console.log('   ┌─────────────┬──────────────────────────┬──────────────────┐');
  console.log('   │ Role        │ Email                    │ Password         │');
  console.log('   ├─────────────┼──────────────────────────┼──────────────────┤');
  console.log('   │ Admin       │ admin@maxcash.com        │ admin123!        │');
  console.log('   │ Manager     │ manager@maxcash.com      │ manager123!      │');
  console.log('   │ Auditor     │ auditor@maxcash.com      │ auditor123!      │');
  console.log('   │ Borrower    │ borrower@maxcash.com     │ borrower123!     │');
  console.log('   │ Borrower    │ john@maxcash.com         │ password123!     │');
  console.log('   └─────────────┴──────────────────────────┴──────────────────┘');
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});