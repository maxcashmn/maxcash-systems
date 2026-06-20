-- ============================================
-- MAXCASH - Loan Summary View
-- ============================================

CREATE OR REPLACE VIEW loan_summary_view AS
SELECT 
  l.id AS loan_id,
  l.user_id,
  u.email,
  u.first_name,
  u.last_name,
  l.amount,
  l.interest_rate,
  l.term_months,
  l.status,
  l.approved_by,
  l.approved_at,
  l.disbursed_at,
  l.created_at,
  -- Calculate monthly payment using the function
  calculate_repayment(l.amount, l.interest_rate, l.term_months) AS monthly_payment,
  -- Calculate total repayment
  calculate_repayment(l.amount, l.interest_rate, l.term_months) * l.term_months AS total_repayment,
  -- Calculate total interest
  (calculate_repayment(l.amount, l.interest_rate, l.term_months) * l.term_months) - l.amount AS total_interest,
  -- Count overdue payments (if any)
  COALESCE(
    (
      SELECT COUNT(*)
      FROM transactions t
      WHERE t.user_id = l.user_id
        AND t.type = 'loan_repayment'
        AND t.status = 'pending'
        AND t.created_at < NOW() - INTERVAL '30 days'
    ),
    0
  ) AS overdue_count
FROM loans l
LEFT JOIN users u ON u.id = l.user_id
WHERE l.deleted_at IS NULL;
