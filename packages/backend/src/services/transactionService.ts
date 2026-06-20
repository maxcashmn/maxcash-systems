import { TransactionRepository } from '../repositories/transactionRepository';
import { AppError } from '../errors/AppError';
import { generateId, generateReference } from '../utils/helpers';

const transactionRepo = new TransactionRepository();

export async function createTransaction(data: {
  userId: string;
  type: string;
  amount: number;
  description?: string;
  metadata?: any;
}) {
  if (data.amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  const reference = generateReference('TXN');

  const transaction = await transactionRepo.create({
    id: generateId(),
    userId: data.userId,
    type: data.type,
    amount: data.amount,
    status: 'pending',
    reference,
    description: data.description,
    metadata: data.metadata,
  });

  return transaction;
}

export async function completeTransaction(transactionId: string) {
  const transaction = await transactionRepo.findById(transactionId);
  if (!transaction) {
    throw AppError.notFound('Transaction not found');
  }

  await transactionRepo.updateStatus(transactionId, 'completed');
  return transaction;
}

export async function failTransaction(transactionId: string) {
  const transaction = await transactionRepo.findById(transactionId);
  if (!transaction) {
    throw AppError.notFound('Transaction not found');
  }

  await transactionRepo.updateStatus(transactionId, 'failed');
  return transaction;
}

export async function getTransactionById(transactionId: string) {
  const transaction = await transactionRepo.findById(transactionId);
  if (!transaction) {
    throw AppError.notFound('Transaction not found');
  }
  return transaction;
}

export async function getUserTransactions(userId: string) {
  return await transactionRepo.findByUserId(userId);
}

export async function getTransactionByReference(reference: string) {
  const transaction = await transactionRepo.findByReference(reference);
  if (!transaction) {
    throw AppError.notFound('Transaction not found');
  }
  return transaction;
}

export async function listTransactions(
  userId: string,
  page: number = 1,
  limit: number = 10,
  filter?: { type?: string; status?: string }
) {
  const offset = (page - 1) * limit;
  let whereClause = 'WHERE user_id = $1 AND deleted_at IS NULL';
  const params: any[] = [userId];

  if (filter?.type) {
    whereClause += ' AND type = $' + (params.length + 1);
    params.push(filter.type);
  }

  if (filter?.status) {
    whereClause += ' AND status = $' + (params.length + 1);
    params.push(filter.status);
  }

  const transactions = await transactionRepo.query(
    `SELECT * FROM transactions ${whereClause} ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  const total = await transactionRepo.count({ user_id: userId, ...filter });

  return {
    data: transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
