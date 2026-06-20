-- ============================================
-- MAXCASH - Calculate Interest Function
-- ============================================

CREATE OR REPLACE FUNCTION calculate_interest(
  principal DECIMAL,
  rate DECIMAL,
  months INTEGER
)
RETURNS DECIMAL
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  monthly_rate DECIMAL;
BEGIN
  IF principal <= 0 OR rate <= 0 OR months <= 0 THEN
    RETURN 0;
  END IF;
  
  monthly_rate := rate / 100 / 12;
  RETURN principal * monthly_rate * months;
END;
$$;

-- Repayment calculation
CREATE OR REPLACE FUNCTION calculate_repayment(
  principal DECIMAL,
  rate DECIMAL,
  months INTEGER
)
RETURNS DECIMAL
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  monthly_rate DECIMAL;
BEGIN
  IF principal <= 0 OR months <= 0 THEN
    RETURN 0;
  END IF;
  
  IF rate <= 0 THEN
    RETURN principal / months;
  END IF;
  
  monthly_rate := rate / 100 / 12;
  RETURN (principal * monthly_rate * POWER(1 + monthly_rate, months)) / (POWER(1 + monthly_rate, months) - 1);
END;
$$;
