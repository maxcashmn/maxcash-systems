export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
