import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/forms/Select';
import { TextArea } from '../../components/forms/TextArea';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../core/utils/formatters';

const employmentOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'business-owner', label: 'Business Owner' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
];

export const ApplyLoan: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: 100,
    termMonths: 1,
    interestRate: 5,
    purpose: '',
    employmentStatus: '',
    monthlyIncome: '',
  });
  const [result, setResult] = useState<{
    totalInterest: number;
    totalRepayment: number;
    monthlyPayment: number;
  } | null>(null);

  const calculateLoan = () => {
    const amount = Number(formData.amount);
    const term = Number(formData.termMonths);
    const rate = Number(formData.interestRate);
    
    // Simple Interest: Fixed percentage of the principal
    const totalInterest = amount * (rate / 100);
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = totalRepayment / term;

    setResult({
      totalInterest,
      totalRepayment,
      monthlyPayment,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      toast.error('Please enter a valid loan amount');
      return;
    }

    if (Number(formData.monthlyIncome) <= 0) {
      toast.error('Please enter your monthly income');
      return;
    }

    setLoading(true);

    try {
      const result = await loanApi.applyForLoan({
        amount: formData.amount,
        termMonths: formData.termMonths,
        purpose: formData.purpose,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: Number(formData.monthlyIncome),
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

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for a Loan</h1>
      <p className="text-gray-600 mb-6">Interest is a fixed percentage of the loan amount. The total interest stays the same regardless of the term.</p>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount ($)
              </label>
              <input
                type="range"
                min="100"
                max="50000"
                step="0.5"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>$100</span>
                <span className="font-semibold text-gray-900">${formData.amount.toFixed(2)}</span>
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
                value={formData.termMonths}
                onChange={(e) => setFormData({ ...formData, termMonths: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 month</span>
                <span className="font-semibold text-gray-900">{formData.termMonths} month{formData.termMonths > 1 ? 's' : ''}</span>
                <span>12 months</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">The term does not affect the total interest</p>
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
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>1%</span>
              <span className="font-semibold text-gray-900">{formData.interestRate}%</span>
              <span>20%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Fixed interest on the principal amount</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              💡 <strong>How it works:</strong> Interest is a fixed percentage of the loan amount. 
              Whether you choose 1 month or 12 months, the total interest remains the same.
            </p>
          </div>

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

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Loan Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-semibold">{formatCurrency(formData.amount)}</p>
              </div>
              <div>
                <p className="text-gray-500">Term</p>
                <p className="font-semibold">{formData.termMonths} months</p>
              </div>
              <div>
                <p className="text-gray-500">Rate</p>
                <p className="font-semibold">{formData.interestRate}%</p>
              </div>
            </div>
            {result && (
              <div className="mt-2 pt-2 border-t border-green-200 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Monthly Payment</p>
                  <p className="font-semibold text-primary-600">{formatCurrency(result.monthlyPayment)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Interest</p>
                  <p className="font-semibold text-orange-600">{formatCurrency(result.totalInterest)}</p>
                </div>
              </div>
            )}
          </div>

          <Button 
            type="button" 
            variant="secondary" 
            onClick={calculateLoan}
            className="w-full"
          >
            Calculate Loan
          </Button>

          <Button type="submit" loading={loading} fullWidth size="lg">
            Submit Application
          </Button>
        </form>
      </Card>
    </div>
  );
};
