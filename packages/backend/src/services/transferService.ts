import { TransferRepository } from '../repositories/transferRepository';
import { WalletRepository } from '../repositories/walletRepository';
import { AppError } from '../errors/AppError';
import { generateId, generateReference } from '../utils/helpers';

const transferRepo = new TransferRepository();
const walletRepo = new WalletRepository();

export async function initiateTransfer(data: {
  fromBorrowerId: string;
  toBorrowerId: string;
  amount: number;
  description?: string;
}) {
  if (data.amount <= 0) {
    throw AppError.validation('Amount must be greater than 0');
  }

  if (data.fromBorrowerId === data.toBorrowerId) {
    throw AppError.validation('Cannot transfer to yourself');
  }

  // Check sender's wallet
  const senderWallet = await walletRepo.findByBorrowerId(data.fromBorrowerId);
  if (!senderWallet) {
    throw AppError.notFound('Sender wallet not found');
  }

  if (senderWallet.balance < data.amount) {
    throw AppError.validation('Insufficient balance');
  }

  // Check recipient's wallet
  const recipientWallet = await walletRepo.findByBorrowerId(data.toBorrowerId);
  if (!recipientWallet) {
    throw AppError.notFound('Recipient wallet not found');
  }

  const reference = generateReference('TRF');

  // Create transfer record
  const transfer = await transferRepo.create({
    id: generateId(),
    from_borrower_id: data.fromBorrowerId,
    to_borrower_id: data.toBorrowerId,
    amount: data.amount,
    status: 'pending',
    reference,
    description: data.description,
  });

  // Process the transfer (would be async in production)
  await processTransfer(transfer.id);

  return transfer;
}

async function processTransfer(transferId: string) {
  const transfer = await transferRepo.findById(transferId);
  if (!transfer) {
    throw AppError.notFound('Transfer not found');
  }

  try {
    // Deduct from sender
    await walletRepo.decrementBalance(transfer.from_borrower_id, transfer.amount);
    // Credit to recipient
    await walletRepo.incrementBalance(transfer.to_borrower_id, transfer.amount);
    // Update transfer status
    await transferRepo.updateStatus(transferId, 'completed');
  } catch (error) {
    await transferRepo.updateStatus(transferId, 'failed');
    throw error;
  }
}

export async function getTransferById(transferId: string) {
  const transfer = await transferRepo.findById(transferId);
  if (!transfer) {
    throw AppError.notFound('Transfer not found');
  }
  return transfer;
}

export async function getBorrowerTransfers(borrowerId: string) {
  return await transferRepo.findByBorrowerId(borrowerId);
}

export async function getTransferByReference(reference: string) {
  const transfer = await transferRepo.findByReference(reference);
  if (!transfer) {
    throw AppError.notFound('Transfer not found');
  }
  return transfer;
}