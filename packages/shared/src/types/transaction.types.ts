export interface Transaction {
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

export interface Transfer {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  status: string;
  reference: string;
  description?: string;
  createdAt: Date;
  completedAt?: Date;
}
