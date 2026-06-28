import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { loanApi } from '../../core/api/loanApi';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/forms/Select';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../core/utils/formatters';

// Loan products with their default terms and interest rates
const loanProducts = [
  { 
    value: 'nano', 
    label: 'Nano Loan (MC-NANO)',
    minAmount: 100,
    maxAmount: 500,
    defaultTerm: 1,
    interestRate: 8.5,
  },
  { 
    value: 'consumer', 
    label: 'Consumer Loan (MC-CONSUMER)',
    minAmount: 501,
    maxAmount: 2000,
    defaultTerm: 1,
    interestRate: 8.0,
  },
  { 
    value: 'micro-business', 
    label: 'Micro Business Loan (MC-MICRO)',
    minAmount: 2001,
    maxAmount: 5000,
    defaultTerm: 2,
    interestRate: 7.5,
  },
  { 
    value: 'sme1', 
    label: 'Small Enterprise Loan (MC-SME1)',
    minAmount: 5001,
    maxAmount: 10000,
    defaultTerm: 3,
    interestRate: 7.0,
  },
  { 
    value: 'sme2', 
    label: 'SME Growth Loan (MC-SME2)',
    minAmount: 10001,
    maxAmount: 20000,
    defaultTerm: 4,
    interestRate: 6.5,
  },
  { 
    value: 'custom', 
    label: 'Custom Loan',
    minAmount: 0,
    maxAmount: 50000,
    defaultTerm: 1,
    interestRate: 5.0,
  },
];

const employmentOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'business-owner', label: 'Business Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
];

export const LoanApplication: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    loanType: '',
    amount: '',
    termMonths: '1',
    interestRate: '5',
    purpose: '',
    employmentStatus: '',
    monthlyIncome: '',
  });
  const [calculatedResult, setCalculatedResult] = useState<{
    totalInterest: number;
    totalRepayment: number;
    monthlyPayment: number;
    paymentSchedule: { month: number; amount: number }[];
  } | null>(null);

  // Auto-set values when loan type changes
  useEffect(() => {
    const selectedProduct = loanProducts.find(p => p.value === formData.loanType);
    if (selectedProduct) {
      const defaultAmount = Math.floor((selectedProduct.minAmount + selectedProduct.maxAmount) / 2);
      setFormData(prev => ({
        ...prev,
        amount: defaultAmount.toString(),
        termMonths: selectedProduct.defaultTerm.toString(),
        interestRate: selectedProduct.interestRate.toString(),
      }));
    }
  }, [formData.loanType]);

  // Calculate loan on change
  useEffect(() => {
    const amount = Number(formData.amount);
    const term = Number(formData.termMonths);
    const rate = Number(formData.interestRate);

    if (amount > 0 && term > 0 && rate >= 1 && rate <= 20) {
      // Simple Interest: Total Interest = Amount × (Rate / 100)
      const totalInterest = amount * (rate / 100);
      const totalRepayment = amount + totalInterest;
      const monthlyPayment = totalRepayment / term;

      // Generate payment schedule
      const paymentSchedule = [];
      let remaining = totalRepayment;
      for (let i = 1; i <= term; i++) {
        const payment = i === term ? remaining : monthlyPayment;
        paymentSchedule.push({ month: i, amount: payment });
        remaining -= payment;
      }

      setCalculatedResult({
        totalInterest,
        totalRepayment,
        monthlyPayment,
        paymentSchedule,
      });
    } else {
      setCalculatedResult(null);
    }
  }, [formData.amount, formData.termMonths, formData.interestRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(formData.amount);
    const monthlyIncome = Number(formData.monthlyIncome);
    const rate = Number(formData.interestRate);

    if (amount <= 0) {
      toast.error('Please enter a valid loan amount');
      return;
    }

    if (rate < 1 || rate > 20) {
      toast.error('Interest rate must be between 1% and 20%');
      return;
    }

    if (monthlyIncome <= 0) {
      toast.error('Please enter your monthly income');
      return;
    }

    setLoading(true);

    try {
      const result = await loanApi.applyForLoan({
        amount,
        termMonths: Number(formData.termMonths),
        purpose: formData.purpose,
        employmentStatus: formData.employmentStatus,
        monthlyIncome,
      });

      if (result) {
        toast.success('Loan application submitted successfully!');
        navigate('/my-loans');
      }
    } catch (error) {
      toast.error('Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = loanProducts.find(p => p.value === formData.loanType);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for a Loan</h1>
      <p className="text-gray-600 mb-6">Choose a loan product or customize your loan. Interest is simple interest (1% - 20%).</p>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Loan Product"
            options={loanProducts.map(p => ({ value: p.value, label: p.label }))}
            placeholder="Select a loan product"
            value={formData.loanType}
            onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Loan Amount ($)"
              type="number"
              placeholder="5000"
              min="1"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <Input
              label="Term (Months)"
              type="number"
              placeholder="1"
              min="1"
              max="12"
              value={formData.termMonths}
              onChange={(e) => setFormData({ ...formData, termMonths: e.target.value })}
              required
            />
            <Input
              label="Interest Rate (%)"
              type="number"
              placeholder="5"
              min="1"
              max="20"
              step="0.5"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Simple Interest:</strong> Total Interest = Amount × (Rate / 100)
              {selectedProduct && formData.loanType !== 'custom' && (
                <span> Default rate for {selectedProduct.label}: {selectedProduct.interestRate}%</span>
              )}
            </p>
          </div>

          {calculatedResult && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Loan Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-semibold">{formatCurrency(Number(formData.amount) || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Term</p>
                  <p className="font-semibold">{formData.termMonths || 0} months</p>
                </div>
                <div>
                  <p className="text-gray-500">Rate</p>
                  <p className="font-semibold">{formData.interestRate || 0}%</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Interest</p>
                  <p className="font-semibold text-orange-600">{formatCurrency(calculatedResult.totalInterest)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Repayment</p>
                  <p className="font-semibold text-green-600">{formatCurrency(calculatedResult.totalRepayment)}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Monthly Payment: <strong>{formatCurrency(calculatedResult.monthlyPayment)}</strong>
                  <span className="text-xs text-gray-500 ml-2">({formData.termMonths} payments)</span>
                </p>
                {calculatedResult.paymentSchedule.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Payment Schedule:</p>
                    <div className="grid grid-cols-6 gap-1 mt-1 text-xs">
                      {calculatedResult.paymentSchedule.map((p) => (
                        <div key={p.month} className="bg-white p-1 rounded border border-gray-200 text-center">
                          <span className="text-gray-500">M{p.month}</span>
                          <span className="block font-medium">{formatCurrency(p.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <Input
                label="Loan Purpose"
                placeholder="e.g., Business expansion, Education, Home improvement"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
              />

              <Select
                label="Employment Status"
                options={employmentOptions}
                placeholder="Select your employment status"
                value={formData.employmentStatus}
                onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                required
              />

              <Input
                label="Monthly Income ($)"
                type="number"
                placeholder="3000"
                min="1"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              💡 <strong>How it works:</strong> 
              Interest is simple interest (1% - 20%). Total Interest = Amount × (Rate / 100). 
              The total is spread evenly over {formData.termMonths || 1} month{Number(formData.termMonths) > 1 ? 's' : ''}.
            </p>
          </div>

          <Button type="submit" loading={loading} fullWidth size="lg">
            Submit Application
          </Button>
        </form>
      </Card>
    </div>
  );
};
