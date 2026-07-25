// src/services/transactionService.ts

import { TransactionRepository } from '../repositories/transactionRepository';
import { AppError } from '../errors/AppError';
import { generateId, generateReference } from '../utils/helpers';

const transactionRepo = new TransactionRepository();

// ===============================
// Types
// ===============================

export interface CreateTransactionData {
  borrowerId: string;
  loanId?: string;
  type: string;
  amount: number;
  currency?: string;
  method?: string;
  description?: string;
  metadata?: any;
}

export interface TransactionFilters {
  type?: string;
  status?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalTransfers: number;
  totalPayments: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
}

// ===============================
// Valid Transaction Types
// ===============================

const VALID_TYPES = [
  'deposit',
  'withdrawal',
  'transfer',
  'payment',
  'loan_disbursement',
  'loan_repayment',
  'fee',
  'refund',
] as const;

type TransactionType = typeof VALID_TYPES[number];

// const VALID_STATUSES = [
//   'pending',
//   'processing',
//   'completed',
//   'failed',
//   'cancelled',
// ] as const;

const VALID_METHODS = [
  'manual',
  'bank_transfer',
  'mobile_money',
  'cash',
  'card',
] as const;

// ===============================
// Transaction CRUD Operations
// ===============================

/**
 * Create a new transaction
 */
export async function createTransaction(data: CreateTransactionData) {
  // Validate amount
  if (data.amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  // Validate type
  if (!VALID_TYPES.includes(data.type as TransactionType)) {
    throw AppError.validation(
      `Invalid transaction type. Must be one of: ${VALID_TYPES.join(', ')}`
    );
  }

  // Validate currency
  if (data.currency && !['USD', 'LRD'].includes(data.currency)) {
    throw AppError.validation('Currency must be USD or LRD');
  }

  // Validate method
  if (data.method && !VALID_METHODS.includes(data.method as any)) {
    throw AppError.validation(
      `Invalid method. Must be one of: ${VALID_METHODS.join(', ')}`
    );
  }

  try {
    const reference = generateReference('TXN');

    const transaction = await transactionRepo.create({
      id: generateId(),
      borrowerId: data.borrowerId,
      loanId: data.loanId,
      type: data.type,
      amount: data.amount,
      currency: data.currency || 'USD',
      method: data.method || 'manual',
      status: 'pending',
      reference,
      description: data.description,
      metadata: data.metadata,
    });

    return {
      success: true,
      message: 'Transaction created successfully',
      data: transaction,
    };
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw AppError.internal('Failed to create transaction');
  }
}

/**
 * Get transaction by ID
 */
export async function getTransactionById(transactionId: string) {
  try {
    const transaction = await transactionRepo.findById(transactionId);
    if (!transaction) {
      throw AppError.notFound('Transaction not found');
    }
    return {
      success: true,
      data: transaction,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error getting transaction by ID:', error);
    throw AppError.internal('Failed to get transaction');
  }
}

/**
 * Get transaction by reference
 */
export async function getTransactionByReference(reference: string) {
  try {
    const transaction = await transactionRepo.findByReference(reference);
    if (!transaction) {
      throw AppError.notFound('Transaction not found');
    }
    return {
      success: true,
      data: transaction,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error getting transaction by reference:', error);
    throw AppError.internal('Failed to get transaction by reference');
  }
}

/**
 * Get all transactions for a borrower
 */
export async function getBorrowerTransactions(borrowerId: string) {
  try {
    const transactions = await transactionRepo.findByBorrowerId(borrowerId);
    return {
      success: true,
      data: transactions,
      count: transactions.length,
    };
  } catch (error) {
    console.error('Error getting borrower transactions:', error);
    throw AppError.internal('Failed to get borrower transactions');
  }
}

/**
 * List transactions with pagination and filtering
 */
export async function listTransactions(
  borrowerId: string,
  page: number = 1,
  limit: number = 10,
  filter?: TransactionFilters
) {
  try {
    // Validate pagination parameters
    const validPage = Math.max(1, page);
    const validLimit = Math.min(100, Math.max(1, limit));

    const result = await transactionRepo.list(borrowerId, validPage, validLimit, filter);

    return {
      success: true,
      data: result.data,
      pagination: {
        page: validPage,
        limit: validLimit,
        total: result.total,
        totalPages: Math.ceil(result.total / validLimit),
      },
    };
  } catch (error) {
    console.error('Error listing transactions:', error);
    throw AppError.internal('Failed to list transactions');
  }
}

// ===============================
// Transaction Status Operations
// ===============================

/**
 * Complete a pending transaction
 */
export async function completeTransaction(transactionId: string) {
  try {
    const transaction = await transactionRepo.findById(transactionId);
    if (!transaction) {
      throw AppError.notFound('Transaction not found');
    }

    if (transaction.status !== 'pending') {
      throw AppError.badRequest(
        `Cannot complete transaction with status: ${transaction.status}`
      );
    }

    const updated = await transactionRepo.updateStatus(transactionId, 'completed');
    return {
      success: true,
      message: 'Transaction completed successfully',
      data: updated,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error completing transaction:', error);
    throw AppError.internal('Failed to complete transaction');
  }
}

/**
 * Fail a transaction
 */
export async function failTransaction(transactionId: string) {
  try {
    const transaction = await transactionRepo.findById(transactionId);
    if (!transaction) {
      throw AppError.notFound('Transaction not found');
    }

    if (transaction.status === 'completed') {
      throw AppError.badRequest('Cannot fail a completed transaction');
    }

    const updated = await transactionRepo.updateStatus(transactionId, 'failed');
    return {
      success: true,
      message: 'Transaction failed',
      data: updated,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error failing transaction:', error);
    throw AppError.internal('Failed to fail transaction');
  }
}

/**
 * Cancel a transaction
 */
export async function cancelTransaction(transactionId: string) {
  try {
    const transaction = await transactionRepo.findById(transactionId);
    if (!transaction) {
      throw AppError.notFound('Transaction not found');
    }

    if (transaction.status === 'completed') {
      throw AppError.badRequest('Cannot cancel a completed transaction');
    }

    if (transaction.status === 'cancelled') {
      throw AppError.badRequest('Transaction is already cancelled');
    }

    const updated = await transactionRepo.updateStatus(transactionId, 'cancelled');
    return {
      success: true,
      message: 'Transaction cancelled successfully',
      data: updated,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error cancelling transaction:', error);
    throw AppError.internal('Failed to cancel transaction');
  }
}

// ===============================
// Transaction Statistics
// ===============================

/**
 * Get transaction statistics for a borrower
 */
export async function getTransactionStats(borrowerId: string): Promise<TransactionStats> {
  try {
    const transactions = await transactionRepo.findByBorrowerId(borrowerId);

    const stats: TransactionStats = {
      totalTransactions: transactions.length,
      totalDeposits: 0,
      totalWithdrawals: 0,
      totalTransfers: 0,
      totalPayments: 0,
      byType: {},
      byStatus: {},
    };

    transactions.forEach((t: any) => {
      // Sum by type
      switch (t.type) {
        case 'deposit':
          stats.totalDeposits += t.amount;
          break;
        case 'withdrawal':
          stats.totalWithdrawals += t.amount;
          break;
        case 'transfer':
          stats.totalTransfers += t.amount;
          break;
        case 'payment':
        case 'loan_repayment':
          stats.totalPayments += t.amount;
          break;
      }

      // Count by type
      stats.byType[t.type] = (stats.byType[t.type] || 0) + 1;
      stats.byStatus[t.status] = (stats.byStatus[t.status] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error('Error getting transaction stats:', error);
    throw AppError.internal('Failed to get transaction statistics');
  }
}

// ===============================
// Bulk Operations
// ===============================

/**
 * Get transactions by date range
 */
export async function getTransactionsByDateRange(
  borrowerId: string,
  startDate: Date,
  endDate: Date
) {
  try {
    const transactions = await transactionRepo.findByDateRange(borrowerId, startDate, endDate);
    return {
      success: true,
      data: transactions,
      count: transactions.length,
    };
  } catch (error) {
    console.error('Error getting transactions by date range:', error);
    throw AppError.internal('Failed to get transactions by date range');
  }
}

/**
 * Soft delete a transaction
 */
export async function deleteTransaction(transactionId: string) {
  try {
    const transaction = await transactionRepo.findById(transactionId);
    if (!transaction) {
      throw AppError.notFound('Transaction not found');
    }

    if (transaction.status === 'completed') {
      throw AppError.badRequest('Cannot delete a completed transaction');
    }

    const deleted = await transactionRepo.softDelete(transactionId);
    
    if (!deleted) {
      throw AppError.internal('Failed to delete transaction');
    }

    return {
      success: true,
      message: 'Transaction deleted successfully',
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error('Error deleting transaction:', error);
    throw AppError.internal('Failed to delete transaction');
  }
}