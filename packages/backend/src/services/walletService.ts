// src/services/walletService.ts

import { WalletRepository } from '../repositories/walletRepository';
import { AppError } from '../errors/AppError';
import { generateId } from '../utils/helpers';

const walletRepo = new WalletRepository();

export async function createWallet(
  borrowerId: string,
  currency: string = 'USD'
) {
  // Check if borrower already has a wallet
  const existingWallet = await walletRepo.findByBorrowerId(borrowerId);
  if (existingWallet) {
    throw AppError.conflict('Borrower already has a wallet');
  }

  const wallet = await walletRepo.create({
    id: generateId(),
    borrowerId: borrowerId,
    balance: 0,
    currency,
    status: 'active',
  });

  return wallet;
}

export async function getWallet(borrowerId: string) {
  const wallet = await walletRepo.findByBorrowerId(borrowerId);
  if (!wallet) {
    throw AppError.notFound('Wallet not found');
  }
  return wallet;
}

export async function getWalletBalance(borrowerId: string) {
  const wallet = await getWallet(borrowerId);
  return {
    balance: wallet.balance,
    currency: wallet.currency,
  };
}

export async function fundWallet(
  borrowerId: string,
  amount: number,
  reference: string
) {
  if (amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  const wallet = await getWallet(borrowerId);
  await walletRepo.incrementBalance(wallet.id, amount);

  const updated = await getWallet(borrowerId);
  return {
    balance: updated.balance,
    currency: updated.currency,
    reference,
  };
}

export async function withdrawFromWallet(
  borrowerId: string,
  amount: number,
  reference: string
) {
  if (amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  const wallet = await getWallet(borrowerId);
  if (wallet.balance < amount) {
    throw AppError.validation('Insufficient balance');
  }

  await walletRepo.decrementBalance(wallet.id, amount);

  const updated = await getWallet(borrowerId);
  return {
    balance: updated.balance,
    currency: updated.currency,
    reference,
  };
}

export async function updateWalletStatus(borrowerId: string, status: string) {
  const wallet = await getWallet(borrowerId);
  await walletRepo.update(wallet.id, { status });
  return { success: true };
}

/**
 * Transfer funds between wallets
 */
export async function transferBetweenWallets(
  fromBorrowerId: string,
  toBorrowerId: string,
  amount: number,
  reference: string
) {
  if (amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  if (fromBorrowerId === toBorrowerId) {
    throw AppError.validation('Cannot transfer to yourself');
  }

  // Get both wallets
  const fromWallet = await getWallet(fromBorrowerId);
  const toWallet = await getWallet(toBorrowerId);

  // Check if sender has enough balance
  if (fromWallet.balance < amount) {
    throw AppError.validation('Insufficient balance');
  }

  // Perform transfer
  await walletRepo.decrementBalance(fromWallet.id, amount);
  await walletRepo.incrementBalance(toWallet.id, amount);

  const updatedFrom = await getWallet(fromBorrowerId);
  const updatedTo = await getWallet(toBorrowerId);

  return {
    success: true,
    fromBalance: updatedFrom.balance,
    toBalance: updatedTo.balance,
    currency: fromWallet.currency,
    reference,
  };
}

/**
 * Get wallet statistics for a borrower
 */
export async function getWalletStats(borrowerId: string) {
  const wallet = await getWallet(borrowerId);
  
  // Get transaction history (if you have a transaction service)
  // This would be expanded with actual transaction data
  
  return {
    balance: wallet.balance,
    currency: wallet.currency,
    status: wallet.status,
    createdAt: wallet.createdAt,
    updatedAt: wallet.updatedAt,
  };
}