export interface CreateTransactionDto {
  type: string;
  amount: number;
  description?: string;
  metadata?: Record<string, any>;
}

export interface TransferDto {
  fromUserId: string;
  toUserId: string;
  amount: number;
  description?: string;
}

export interface TransactionResponseDto {
  id: string;
  userId: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
