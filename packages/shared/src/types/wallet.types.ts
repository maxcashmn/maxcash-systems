// src/types/wallet.types.ts

export interface Wallet {
  id: string;
  borrowerId: string;    // Changed from userId
  balance: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}