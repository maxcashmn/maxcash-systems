export interface Loan {
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

export interface LoanApplication {
  id: string;
  userId: string;
  amount: number;
  termMonths: number;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: number;
  status: string;
  submittedAt: Date;
  reviewedAt?: Date;
  notes?: string;
}
