import { LoanRepository } from '../repositories/loanRepository';
import { AppError } from '../errors/AppError';
import { generateId } from '../utils/helpers';
import { calculateRepayment } from '../utils/currency';

const loanRepo = new LoanRepository();

export async function applyForLoan(data: {
  userId: string;
  amount: number;
  termMonths: number;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: number;
}) {
  if (data.amount <= 0) {
    throw AppError.validation('Loan amount must be greater than 0');
  }

  if (data.termMonths <= 0) {
    throw AppError.validation('Loan term must be greater than 0');
  }

  // Check for existing active loan applications
  const existingLoans = await loanRepo.findByUserId(data.userId);
  const activeApplications = existingLoans.filter(
    (loan: any) => loan.status === 'pending' || loan.status === 'under_review'
  );

  if (activeApplications.length > 0) {
    throw AppError.conflict('You already have a pending loan application');
  }

  // Calculate interest (using a base rate of 5% + risk adjustment)
  const baseRate = 5;
  // Simple risk adjustment based on loan amount relative to income
  const incomeRatio = data.amount / data.monthlyIncome;
  const riskAdjustment = incomeRatio > 24 ? 3 : incomeRatio > 12 ? 2 : 1;
  const interestRate = baseRate + riskAdjustment;

  const loan = await loanRepo.create({
    id: generateId(),
    user_id: data.userId,
    amount: data.amount,
    interest_rate: interestRate,
    term_months: data.termMonths,
    purpose: data.purpose,
    status: 'pending',
  });

  return loan;
}

export async function approveLoan(loanId: string, approvedBy: string) {
  const loan = await loanRepo.findById(loanId);
  if (!loan) {
    throw AppError.notFound('Loan not found');
  }

  if (loan.status !== 'pending' && loan.status !== 'under_review') {
    throw AppError.validation('Loan cannot be approved in its current state');
  }

  await loanRepo.approveLoan(loanId, approvedBy);
  return { success: true, loanId };
}

export async function rejectLoan(loanId: string, reason: string) {
  const loan = await loanRepo.findById(loanId);
  if (!loan) {
    throw AppError.notFound('Loan not found');
  }

  if (loan.status !== 'pending' && loan.status !== 'under_review') {
    throw AppError.validation('Loan cannot be rejected in its current state');
  }

  await loanRepo.updateStatus(loanId, 'rejected');
  return { success: true, reason };
}

export async function disburseLoan(loanId: string) {
  const loan = await loanRepo.findById(loanId);
  if (!loan) {
    throw AppError.notFound('Loan not found');
  }

  if (loan.status !== 'approved') {
    throw AppError.validation('Loan must be approved before disbursement');
  }

  await loanRepo.disburseLoan(loanId);
  return { success: true, loanId };
}

export async function getLoanById(loanId: string) {
  const loan = await loanRepo.findById(loanId);
  if (!loan) {
    throw AppError.notFound('Loan not found');
  }

  // Calculate repayment details
  const monthlyPayment = calculateRepayment(
    loan.amount,
    loan.interest_rate,
    loan.term_months
  );
  const totalRepayment = monthlyPayment * loan.term_months;
  const totalInterest = totalRepayment - loan.amount;

  return {
    ...loan,
    monthlyPayment,
    totalRepayment,
    totalInterest,
  };
}

export async function getUserLoans(userId: string) {
  return await loanRepo.findByUserId(userId);
}

export async function getActiveLoans() {
  return await loanRepo.findActiveLoans();
}
