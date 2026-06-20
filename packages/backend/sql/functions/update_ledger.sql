-- ============================================
-- MAXCASH - Update Ledger Function
-- ============================================

CREATE OR REPLACE FUNCTION update_ledger(
  p_user_id UUID,
  p_transaction_id UUID,
  p_type VARCHAR,
  p_amount DECIMAL,
  p_description TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_balance_before DECIMAL;
  v_balance_after DECIMAL;
  v_wallet_id UUID;
  v_ledger_id UUID;
BEGIN
  -- Get current wallet balance
  SELECT id, balance INTO v_wallet_id, v_balance_before
  FROM wallets
  WHERE user_id = p_user_id AND deleted_at IS NULL;
  
  IF v_wallet_id IS NULL THEN
    RAISE EXCEPTION 'Wallet not found for user %', p_user_id;
  END IF;
  
  -- Calculate new balance
  v_balance_after := v_balance_before + p_amount;
  
  -- Insert ledger entry
  INSERT INTO ledger_entries (
    user_id,
    transaction_id,
    type,
    amount,
    balance_before,
    balance_after,
    description,
    metadata
  ) VALUES (
    p_user_id,
    p_transaction_id,
    p_type,
    p_amount,
    v_balance_before,
    v_balance_after,
    p_description,
    p_metadata
  ) RETURNING id INTO v_ledger_id;
  
  -- Update wallet balance
  UPDATE wallets 
  SET balance = v_balance_after, updated_at = NOW()
  WHERE id = v_wallet_id;
  
  RETURN v_ledger_id;
END;
$$;
