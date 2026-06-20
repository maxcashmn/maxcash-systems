import { WalletRepository } from '../repositories/walletRepository';
import { AppError } from '../errors/AppError';
import { generateId } from '../utils/helpers';

const walletRepo = new WalletRepository();

export async function createWallet(
  userId: string,
  currency: string = 'USD'
) {
  // Check if user already has a wallet
  const existingWallet = await walletRepo.findByUserId(userId);
  if (existingWallet) {
    throw AppError.conflict('User already has a wallet');
  }

  const wallet = await walletRepo.create({
    id: generateId(),
    userId: userId,
    balance: 0,
    currency,
    status: 'active',
  });

  return wallet;
}

export async function getWallet(userId: string) {
  const wallet = await walletRepo.findByUserId(userId);
  if (!wallet) {
    throw AppError.notFound('Wallet not found');
  }
  return wallet;
}

export async function getWalletBalance(userId: string) {
  const wallet = await getWallet(userId);
  return {
    balance: wallet.balance,
    currency: wallet.currency,
  };
}

export async function fundWallet(
  userId: string,
  amount: number,
  reference: string
) {
  if (amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  const wallet = await getWallet(userId);
  await walletRepo.incrementBalance(wallet.id, amount);

  const updated = await getWallet(userId);
  return {
    balance: updated.balance,
    currency: updated.currency,
    reference,
  };
}

export async function withdrawFromWallet(
  userId: string,
  amount: number,
  reference: string
) {
  if (amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  const wallet = await getWallet(userId);
  if (wallet.balance < amount) {
    throw AppError.validation('Insufficient balance');
  }

  await walletRepo.decrementBalance(wallet.id, amount);

  const updated = await getWallet(userId);
  return {
    balance: updated.balance,
    currency: updated.currency,
    reference,
  };
}

export async function updateWalletStatus(userId: string, status: string) {
  const wallet = await getWallet(userId);
  await walletRepo.update(wallet.id, { status });
  return { success: true };
}
