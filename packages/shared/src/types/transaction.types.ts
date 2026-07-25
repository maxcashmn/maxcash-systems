// src/types/transaction.types.ts

export interface Transaction {
  id: string;
  borrowerId: string;        // Changed from userId
  loanId?: string;           // Added
  type: string;
  amount: number;
  currency?: string;         // Added
  method?: string;           // Added
  status: string;
  reference: string;
  description?: string;
  balanceAfter?: number;     // Added
  createdBy?: string;        // Added
  transactionDate: Date;     // Added
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}


export interface Transfer {
  id: string;
  fromBorrowerId: string;    // Changed from fromUserId
  toBorrowerId: string;      // Changed from toUserId
  amount: number;
  status: string;
  reference: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}