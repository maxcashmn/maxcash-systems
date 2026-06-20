import { TransactionRepository } from '../repositories/transactionRepository';
import { LedgerRepository } from '../repositories/ledgerRepository';
import { WalletRepository } from '../repositories/walletRepository';

const transactionRepo = new TransactionRepository();
const ledgerRepo = new LedgerRepository();
const walletRepo = new WalletRepository();

export async function reconcileTransaction(transactionId: string) {
  const transaction = await transactionRepo.findById(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }

  // Get ledger entries for this transaction
  const ledgerEntries = await ledgerRepo.findByTransactionId(transactionId);

  // Verify balances
  const wallet = await walletRepo.findByUserId(transaction.userId);
  if (!wallet) {
    throw new Error('Wallet not found');
  }

  // Check if ledger entries match transaction
  let totalLedgerAmount = 0;
  for (const entry of ledgerEntries) {
    totalLedgerAmount += entry.amount;
  }

  const isReconciled = totalLedgerAmount === transaction.amount;

  return {
    transactionId,
    isReconciled,
    transactionAmount: transaction.amount,
    ledgerTotal: totalLedgerAmount,
    walletBalance: wallet.balance,
    difference: transaction.amount - totalLedgerAmount,
  };
}

export async function reconcileUserTransactions(userId: string) {
  const transactions = await transactionRepo.findByUserId(userId);
  const results = [];

  for (const transaction of transactions) {
    if (transaction.status === 'completed') {
      const result = await reconcileTransaction(transaction.id);
      results.push(result);
    }
  }

  return results;
}

export async function getReconciliationReport() {
  // Get all completed transactions
  // This would be a more complex query in production
  return {
    totalTransactions: 0,
    reconciled: 0,
    unreconciled: 0,
    totalDifference: 0,
  };
}
