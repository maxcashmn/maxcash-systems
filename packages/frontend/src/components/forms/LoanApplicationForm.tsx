// packages/frontend/src/components/forms/LoanApplicationForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi, ApplyLoanData } from '../../core/api/loanApi';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const LoanApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ApplyLoanData & { confirmTerms?: boolean }>({
    amount: 1000,
    termMonths: 12,
    purpose: '',
    employmentStatus: '',
    monthlyIncome: 1000,
    confirmTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.confirmTerms) {
      toast.error('Please confirm you agree to the terms and conditions');
      return;
    }

    if (formData.amount <= 0) {
      toast.error('Please enter a valid loan amount');
      return;
    }

    if (formData.monthlyIncome <= 0) {
      toast.error('Please enter your monthly income');
      return;
    }

    setLoading(true);

    try {
      const response = await loanApi.applyForLoan({
        amount: formData.amount,
        termMonths: formData.termMonths,
        purpose: formData.purpose,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: formData.monthlyIncome,
      });

      toast.success('Loan application submitted successfully!');
      navigate('/my-loans');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to submit loan application. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate estimated monthly payment
  const calculateEstimatedPayment = () => {
    if (formData.amount <= 0 || formData.termMonths <= 0) return 0;
    const monthlyRate = 0.05 / 12; // Assuming 5% annual interest rate
    const payment = formData.amount * monthlyRate * Math.pow(1 + monthlyRate, formData.termMonths) / (Math.pow(1 + monthlyRate, formData.termMonths) - 1);
    return isNaN(payment) ? 0 : Math.round(payment);
  };

  const estimatedPayment = calculateEstimatedPayment();

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50/50 border-2 border-orange-100/30 hover:border-orange-200/50 transition-all duration-300 hover:shadow-xl">
        <motion.div
          animate={{
            opacity: [0, 0.05, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Loan Details
          </h3>

          <div className="space-y-4">
            {/* Loan Amount with Slider */}
            <motion.div variants={fadeInUp}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Loan Amount ($)</label>
                <span className="text-lg font-bold text-orange-600">
                  ${formData.amount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$100</span>
                <span>$50,000</span>
              </div>
            </motion.div>

            {/* Loan Term with Slider */}
            <motion.div variants={fadeInUp}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">Term (Months)</label>
                <span className="text-lg font-bold text-blue-600">
                  {formData.termMonths} months
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={formData.termMonths}
                onChange={(e) => setFormData({ ...formData, termMonths: Number(e.target.value) })}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 month</span>
                <span>60 months</span>
              </div>
            </motion.div>

            {/* Estimated Payment */}
            {estimatedPayment > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 rounded-lg border border-emerald-200/50"
              >
                <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${estimatedPayment.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Based on 5% APR. Actual rate may vary.</p>
              </motion.div>
            )}

            <motion.div variants={fadeInUp}>
              <Input
                label="Loan Purpose"
                placeholder="e.g., Business expansion, Education, Home improvement"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
                className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Input
                label="Employment Status"
                placeholder="e.g., Employed, Self-employed, Business owner"
                value={formData.employmentStatus}
                onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                required
                className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Input
                label="Monthly Income ($)"
                type="number"
                placeholder="3000"
                min="1"
                value={formData.monthlyIncome || ''}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                required
                className="border-slate-200 focus:border-orange-400 focus:ring-orange-400"
              />
            </motion.div>
          </div>
        </div>
      </Card>

      <motion.div variants={fadeInUp}>
        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-2 border-slate-200/50 hover:border-orange-200/50 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="confirmTerms"
                checked={formData.confirmTerms}
                onChange={(e) => setFormData({ ...formData, confirmTerms: e.target.checked })}
                className="mt-1 w-4 h-4 text-orange-500 border-slate-300 rounded focus:ring-orange-400"
              />
              <label htmlFor="confirmTerms" className="text-sm text-gray-600">
                I confirm that the information provided is accurate and I agree to the
                <a href="/terms" className="text-orange-500 hover:text-orange-600 font-medium ml-1">
                  terms and conditions
                </a>
                of the loan agreement.
              </label>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="submit" 
          loading={loading} 
          fullWidth 
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </motion.div>
    </motion.form>
  );
};