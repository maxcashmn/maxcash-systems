-- Update users table to match application expectations
-- Adds missing columns and renames columns for consistency

-- Add missing columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS email_verification_token TEXT,
ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Copy data from active to status
UPDATE users SET status = CASE 
  WHEN active = true THEN 'active' 
  ELSE 'inactive' 
END;

-- Make status NOT NULL after data migration
ALTER TABLE users ALTER COLUMN status SET NOT NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Comments for documentation
COMMENT ON COLUMN users.email_verified IS 'Whether the user has verified their email address';
COMMENT ON COLUMN users.phone_verified IS 'Whether the user has verified their phone number';
COMMENT ON COLUMN users.status IS 'User account status: active, inactive, pending, suspended';
COMMENT ON COLUMN users.active IS 'Legacy column - use status instead';
COMMENT ON COLUMN users.email_verification_token IS 'Token for email verification';
COMMENT ON COLUMN users.email_verification_expires IS 'Expiration time for verification token';
