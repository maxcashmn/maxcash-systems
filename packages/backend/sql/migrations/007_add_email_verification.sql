-- 007_add_email_verification.sql

ALTER TABLE users
ADD COLUMN IF NOT EXISTS email_verification_token VARCHAR(255);

ALTER TABLE users
ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_users_email_verification_token
ON users(email_verification_token);



-- -- ============================================
-- -- MAXCASH - Email Verification Migration
-- -- ============================================

-- ALTER TABLE users
-- ADD COLUMN IF NOT EXISTS email_verification_token VARCHAR(255);

-- ALTER TABLE users
-- ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP WITH TIME ZONE;


-- CREATE INDEX IF NOT EXISTS idx_users_email_verification_token
-- ON users(email_verification_token);