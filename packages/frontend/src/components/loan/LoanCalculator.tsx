import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../core/utils/formatters';

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [termMonths, setTermMonths] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [result, setResult] = useState<{
    totalInterest: number;
    totalRepayment: number;
    monthlyPayment: number;
    paymentSchedule: { month: number; amount: number }[];
  } | null>(null);

  const calculateLoan = () => {
    // Simple Interest: Total Interest = Amount × (Rate / 100)
    const totalInterest = amount * (interestRate / 100);
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = totalRepayment / termMonths;

    // Generate payment schedule
    const paymentSchedule = [];
    let remaining = totalRepayment;
    for (let i = 1; i <= termMonths; i++) {
      const payment = i === termMonths ? remaining : monthlyPayment;
      paymentSchedule.push({ month: i, amount: payment });
      remaining -= payment;
    }

    setResult({
      totalInterest,
      totalRepayment,
      monthlyPayment,
      paymentSchedule,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Calculator</h1>
        <p className="text-gray-600">
          Calculate your simple interest loan. Interest is a fixed percentage (1% - 20%) of the loan amount.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount ($)
              </label>
              <input
                type="range"
                min="100"
                max="50000"
                step="0.5"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$100</span>
                <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
                <span>$50,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Term (Months)
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 month</span>
                <span className="font-semibold text-gray-900">{termMonths} month{termMonths > 1 ? 's' : ''}</span>
                <span>12 months</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1%</span>
                <span className="font-semibold text-gray-900">{interestRate}%</span>
                <span>20%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Simple interest on the principal amount</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                💡 <strong>Simple Interest:</strong> Total Interest = Amount × (Rate / 100)
              </p>
            </div>

            <Button onClick={calculateLoan} fullWidth>
              Calculate
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {result ? (
            <>
              <Card className="bg-primary-50 border-primary-200">
                <h3 className="text-sm text-gray-600 mb-1">Total Interest</h3>
                <p className="text-3xl font-bold text-primary-600">
                  {formatCurrency(result.totalInterest)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {interestRate}% of ${amount.toFixed(2)}
                </p>
              </Card>
              <Card>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm text-gray-600">Total Repayment</h3>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(result.totalRepayment)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Principal + Interest
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-600">Monthly Payment</h3>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(result.monthlyPayment)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Over {termMonths} month{termMonths > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">Payment Schedule</p>
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      {result.paymentSchedule.map((p) => (
                        <div key={p.month} className="bg-gray-50 p-1 rounded text-center text-xs">
                          <span className="text-gray-500">M{p.month}</span>
                          <span className="block font-medium">{formatCurrency(p.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="flex items-center justify-center h-48 text-gray-500">
              <p className="text-center">
                Enter your loan details<br />
                and click "Calculate"
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
