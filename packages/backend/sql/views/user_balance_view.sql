-- ============================================
-- MAXCASH - User Balance View
-- ============================================

CREATE OR REPLACE VIEW user_balance_view AS
SELECT 
  u.id AS user_id,
  u.email,
  u.first_name,
  u.last_name,
  w.id AS wallet_id,
  w.balance,
  w.currency,
  COALESCE(
    (
      SELECT SUM(amount) 
      FROM loans 
      WHERE user_id = u.id 
        AND status IN ('active', 'disbursed')
        AND deleted_at IS NULL
    ), 
    0
  ) AS total_loan_balance,
  COALESCE(
    (
      SELECT SUM(amount) 
      FROM transactions 
      WHERE user_id = u.id 
        AND status = 'pending'
        AND type = 'withdrawal'
        AND deleted_at IS NULL
    ), 
    0
  ) AS pending_withdrawals
FROM users u
LEFT JOIN wallets w ON w.user_id = u.id AND w.deleted_at IS NULL
WHERE u.deleted_at IS NULL;
