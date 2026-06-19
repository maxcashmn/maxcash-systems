export interface CreateWalletDto {
  userId: string;
  currency?: string;
}

export interface UpdateWalletDto {
  status?: string;
}

export interface WalletResponseDto {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundWalletDto {
  amount: number;
  reference: string;
}
