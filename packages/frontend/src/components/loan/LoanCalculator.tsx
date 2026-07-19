// src/components/loan/LoanCalculator.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../core/utils/formatters';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Types
interface PaymentScheduleItem {
  month: number;
  amount: number;
}

interface LoanResult {
  totalInterest: number;
  totalRepayment: number;
  monthlyPayment: number;
  paymentSchedule: PaymentScheduleItem[];
}

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [termMonths, setTermMonths] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [result, setResult] = useState<LoanResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateLoan = (): void => {
    setIsCalculating(true);
    
    // Simple Interest: Total Interest = Amount × (Rate / 100)
    const totalInterest: number = amount * (interestRate / 100);
    const totalRepayment: number = amount + totalInterest;
    const monthlyPayment: number = totalRepayment / termMonths;

    // Generate payment schedule with proper typing
    const paymentSchedule: PaymentScheduleItem[] = [];
    let remaining: number = totalRepayment;
    
    for (let i = 1; i <= termMonths; i++) {
      const payment: number = i === termMonths ? remaining : monthlyPayment;
      paymentSchedule.push({ month: i, amount: Number(payment.toFixed(2)) });
      remaining -= payment;
    }

    setTimeout(() => {
      setResult({
        totalInterest: Number(totalInterest.toFixed(2)),
        totalRepayment: Number(totalRepayment.toFixed(2)),
        monthlyPayment: Number(monthlyPayment.toFixed(2)),
        paymentSchedule,
      });
      setIsCalculating(false);
    }, 400);
  };

  useEffect(() => {
    calculateLoan();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"
          />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-orange-200/50">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-orange-700">Loan Calculator</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Plan Your </span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent bg-gradient-200 animate-gradient">Loan</span>
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Calculate your simple interest loan. Interest is a fixed percentage (1% - 20%) of the loan amount.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
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
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Loan Details
                </h2>

                {/* Loan Amount */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                    <motion.span
                      key={amount}
                      initial={{ scale: 1.2, color: '#f97316' }}
                      animate={{ scale: 1, color: '#1f2937' }}
                      className="text-lg font-bold text-gray-900"
                    >
                      {formatCurrency(amount)}
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="50000"
                    step="0.5"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatCurrency(100)}</span>
                    <span>{formatCurrency(50000)}</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Loan Term</label>
                    <motion.span
                      key={termMonths}
                      initial={{ scale: 1.2, color: '#f97316' }}
                      animate={{ scale: 1, color: '#1f2937' }}
                      className="text-lg font-bold text-gray-900"
                    >
                      {termMonths} month{termMonths > 1 ? 's' : ''}
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 month</span>
                    <span>12 months</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                    <motion.span
                      key={interestRate}
                      initial={{ scale: 1.2, color: '#f97316' }}
                      animate={{ scale: 1, color: '#1f2937' }}
                      className="text-lg font-bold text-gray-900"
                    >
                      {interestRate}%
                    </motion.span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <span className="text-orange-500">💡</span>
                    Simple interest on the principal amount
                  </p>
                </div>

                {/* Info Box */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-3 rounded-lg border border-orange-200/50 mb-4"
                >
                  <p className="text-sm text-gray-700">
                    <strong className="text-orange-600">Simple Interest:</strong> Total Interest = Amount × (Rate / 100)
                  </p>
                </motion.div>

                {/* Calculate Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={calculateLoan} 
                    fullWidth
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                  >
                    {isCalculating ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Calculating...
                      </span>
                    ) : (
                      'Calculate Loan'
                    )}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {result ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-4"
              >
                {/* Total Interest */}
                <motion.div variants={fadeInUp}>
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <h3 className="text-sm text-gray-600 mb-1">Total Interest</h3>
                      <motion.p
                        key={result.totalInterest}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                      >
                        {formatCurrency(result.totalInterest)}
                      </motion.p>
                      <p className="text-xs text-gray-500 mt-1">
                        {interestRate}% of {formatCurrency(amount)}
                      </p>
                    </div>
                  </Card>
                </motion.div>

                {/* Total Repayment & Monthly Payment */}
                <motion.div variants={fadeInUp}>
                  <Card className="border-2 border-slate-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-sm text-gray-600">Total Repayment</h3>
                        <motion.p
                          key={result.totalRepayment}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                          className="text-xl font-bold text-gray-900"
                        >
                          {formatCurrency(result.totalRepayment)}
                        </motion.p>
                        <p className="text-xs text-gray-500">Principal + Interest</p>
                      </div>
                      <div className="pt-3 border-t border-slate-200">
                        <h3 className="text-sm text-gray-600">Monthly Payment</h3>
                        <motion.p
                          key={result.monthlyPayment}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                          className="text-xl font-bold text-emerald-600"
                        >
                          {formatCurrency(result.monthlyPayment)}
                        </motion.p>
                        <p className="text-xs text-gray-500">
                          Over {termMonths} month{termMonths > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Payment Schedule */}
                <motion.div variants={fadeInUp}>
                  <Card className="border-2 border-slate-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Schedule</h3>
                      <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto">
                        {result.paymentSchedule.map((payment: PaymentScheduleItem, index: number) => (
                          <motion.div
                            key={payment.month}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + index * 0.02 }}
                            whileHover={{ scale: 1.05, backgroundColor: '#fef3c7' }}
                            className="bg-gray-50 p-2 rounded text-center text-xs border border-slate-100 hover:border-orange-200 transition-all duration-200"
                          >
                            <span className="text-gray-500">M{payment.month}</span>
                            <span className="block font-medium text-gray-700">
                              {formatCurrency(payment.amount)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ) : (
              <Card className="flex items-center justify-center h-64 text-gray-500 border-2 border-dashed border-slate-200">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">🔄</div>
                  <p className="text-lg font-medium text-gray-600">Enter your loan details</p>
                  <p className="text-sm text-gray-400 mt-1">and click "Calculate"</p>
                </motion.div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import { Card } from '../ui/Card';
// import { Button } from '../ui/Button';
// import { formatCurrency } from '../../core/utils/formatters';

// export const LoanCalculator: React.FC = () => {
//   const [amount, setAmount] = useState<number>(100);
//   const [termMonths, setTermMonths] = useState<number>(1);
//   const [interestRate, setInterestRate] = useState<number>(5);
//   const [result, setResult] = useState<{
//     totalInterest: number;
//     totalRepayment: number;
//     monthlyPayment: number;
//     paymentSchedule: { month: number; amount: number }[];
//   } | null>(null);

//   const calculateLoan = () => {
//     // Simple Interest: Total Interest = Amount × (Rate / 100)
//     const totalInterest = amount * (interestRate / 100);
//     const totalRepayment = amount + totalInterest;
//     const monthlyPayment = totalRepayment / termMonths;

//     // Generate payment schedule
//     const paymentSchedule = [];
//     let remaining = totalRepayment;
//     for (let i = 1; i <= termMonths; i++) {
//       const payment = i === termMonths ? remaining : monthlyPayment;
//       paymentSchedule.push({ month: i, amount: payment });
//       remaining -= payment;
//     }

//     setResult({
//       totalInterest,
//       totalRepayment,
//       monthlyPayment,
//       paymentSchedule,
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Calculator</h1>
//         <p className="text-gray-600">
//           Calculate your simple interest loan. Interest is a fixed percentage (1% - 20%) of the loan amount.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <Card>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Loan Amount ($)
//               </label>
//               <input
//                 type="range"
//                 min="100"
//                 max="50000"
//                 step="0.5"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-500 mt-1">
//                 <span>$100</span>
//                 <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
//                 <span>$50,000</span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Loan Term (Months)
//               </label>
//               <input
//                 type="range"
//                 min="1"
//                 max="12"
//                 step="1"
//                 value={termMonths}
//                 onChange={(e) => setTermMonths(Number(e.target.value))}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-500 mt-1">
//                 <span>1 month</span>
//                 <span className="font-semibold text-gray-900">{termMonths} month{termMonths > 1 ? 's' : ''}</span>
//                 <span>12 months</span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Interest Rate (%)
//               </label>
//               <input
//                 type="range"
//                 min="1"
//                 max="20"
//                 step="0.5"
//                 value={interestRate}
//                 onChange={(e) => setInterestRate(Number(e.target.value))}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-500 mt-1">
//                 <span>1%</span>
//                 <span className="font-semibold text-gray-900">{interestRate}%</span>
//                 <span>20%</span>
//               </div>
//               <p className="text-xs text-gray-400 mt-1">Simple interest on the principal amount</p>
//             </div>

//             <div className="bg-gray-50 p-3 rounded-lg">
//               <p className="text-sm text-gray-600">
//                 💡 <strong>Simple Interest:</strong> Total Interest = Amount × (Rate / 100)
//               </p>
//             </div>

//             <Button onClick={calculateLoan} fullWidth>
//               Calculate
//             </Button>
//           </div>
//         </Card>

//         <div className="space-y-4">
//           {result ? (
//             <>
//               <Card className="bg-primary-50 border-primary-200">
//                 <h3 className="text-sm text-gray-600 mb-1">Total Interest</h3>
//                 <p className="text-3xl font-bold text-primary-600">
//                   {formatCurrency(result.totalInterest)}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {interestRate}% of ${amount.toFixed(2)}
//                 </p>
//               </Card>
//               <Card>
//                 <div className="space-y-3">
//                   <div>
//                     <h3 className="text-sm text-gray-600">Total Repayment</h3>
//                     <p className="text-xl font-semibold text-gray-900">
//                       {formatCurrency(result.totalRepayment)}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Principal + Interest
//                     </p>
//                   </div>
//                   <div>
//                     <h3 className="text-sm text-gray-600">Monthly Payment</h3>
//                     <p className="text-xl font-semibold text-gray-900">
//                       {formatCurrency(result.monthlyPayment)}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Over {termMonths} month{termMonths > 1 ? 's' : ''}
//                     </p>
//                   </div>
//                   <div className="pt-3 border-t border-gray-200">
//                     <p className="text-sm text-gray-600">Payment Schedule</p>
//                     <div className="grid grid-cols-3 gap-1 mt-2">
//                       {result.paymentSchedule.map((p) => (
//                         <div key={p.month} className="bg-gray-50 p-1 rounded text-center text-xs">
//                           <span className="text-gray-500">M{p.month}</span>
//                           <span className="block font-medium">{formatCurrency(p.amount)}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </>
//           ) : (
//             <Card className="flex items-center justify-center h-48 text-gray-500">
//               <p className="text-center">
//                 Enter your loan details<br />
//                 and click "Calculate"
//               </p>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
