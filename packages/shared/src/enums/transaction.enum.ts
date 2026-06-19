export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
  LOAN_DISBURSEMENT = 'loan_disbursement',
  LOAN_REPAYMENT = 'loan_repayment',
  INTEREST = 'interest',
  FEE = 'fee',
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REVERSED = 'reversed',
}
