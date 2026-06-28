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
  // Simple validation
  if (data.amount <= 0) {
    throw AppError.validation('Loan amount must be greater than 0');
  }

  if (data.termMonths <= 0 || data.termMonths > 12) {
    throw AppError.validation('Loan term must be between 1 and 12 months');
  }

  // Simple interest rate (5% base + risk adjustment)
  const baseRate = 5;
  const incomeRatio = data.amount / data.monthlyIncome;
  const riskAdjustment = incomeRatio > 24 ? 3 : incomeRatio > 12 ? 2 : 1;
  const interestRate = baseRate + riskAdjustment;

  // Create application first
  // TODO: Insert into loan_applications table

  // Create loan
  const loan = await loanRepo.create({
    id: generateId(),
    application_id: generateId(), // TODO: Link to actual application
    borrower_id: data.userId,
    principal_amount: data.amount,
    interest_rate: interestRate,
    currency: 'USD',
    status: 'pending',
    disbursed_at: new Date(),
    due_date: new Date(Date.now() + data.termMonths * 30 * 24 * 60 * 60 * 1000),
    created_at: new Date(),
    updated_at: new Date(),
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
    loan.principal_amount,
    loan.interest_rate,
    12
  );
  const totalRepayment = monthlyPayment * 12;
  const totalInterest = totalRepayment - loan.principal_amount;

  return {
    ...loan,
    monthlyPayment,
    totalRepayment,
    totalInterest,
  };
}

export async function getUserLoans(userId: string) {
  try {
    return await loanRepo.findByUserId(userId);
  } catch (error) {
    console.error('Error getting user loans:', error);
    return [];
  }
}

export async function getActiveLoans() {
  try {
    return await loanRepo.findActiveLoans();
  } catch (error) {
    console.error('Error getting active loans:', error);
    return [];
  }
}
