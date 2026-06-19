export interface CreateLoanDto {
  amount: number;
  termMonths: number;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: number;
}

export interface UpdateLoanDto {
  amount?: number;
  termMonths?: number;
  purpose?: string;
  status?: string;
}

export interface ApproveLoanDto {
  approvedBy: string;
  notes?: string;
}

export interface RejectLoanDto {
  reason: string;
}

export interface LoanResponseDto {
  id: string;
  userId: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  purpose: string;
  status: string;
  approvedBy?: string;
  approvedAt?: Date;
  disbursedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
