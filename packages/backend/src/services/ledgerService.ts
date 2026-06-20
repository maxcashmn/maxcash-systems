import { LedgerRepository } from '../repositories/ledgerRepository';
import { generateId } from '../utils/helpers';

const ledgerRepo = new LedgerRepository();

export async function createLedgerEntry(data: {
  userId: string;
  transactionId: string;
  type: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description?: string;
  metadata?: any;
}) {
  return await ledgerRepo.create({
    id: generateId(),
    user_id: data.userId,
    transaction_id: data.transactionId,
    type: data.type,
    amount: data.amount,
    balance_before: data.balanceBefore,
    balance_after: data.balanceAfter,
    description: data.description,
    metadata: data.metadata,
  });
}

export async function getLedgerEntries(userId: string) {
  return await ledgerRepo.findByUserId(userId);
}

export async function getLedgerByTransaction(transactionId: string) {
  return await ledgerRepo.findByTransactionId(transactionId);
}
