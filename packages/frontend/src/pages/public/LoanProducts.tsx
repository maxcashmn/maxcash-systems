import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ROUTES } from '../../core/constants/routes';
import { formatCurrency } from '../../core/utils/formatters';

interface LoanProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  requirements: string[];
  repaymentPeriod: string;
  icon: string;
  color: string;
}

const loanProducts: LoanProduct[] = [
  {
    id: 'nano',
    code: 'MC-NANO',
    name: 'Nano Loan',
    description: 'Quick, accessible loans for everyday needs and small expenses.',
    minAmount: 100,
    maxAmount: 500,
    requirements: [
      'Basic ID verification',
      'Phone number verification',
      'Customer trust assessment',
    ],
    repaymentPeriod: '1 month',
    icon: '🪙',
    color: 'from-green-50 to-emerald-50',
  },
  {
    id: 'consumer',
    code: 'MC-CONSUMER',
    name: 'Consumer Loan',
    description: 'Flexible consumer financing for personal and household needs.',
    minAmount: 501,
    maxAmount: 2000,
    requirements: [
      'Valid ID',
      'Proof of income or guarantor',
      'Collateral valued at loan amount',
    ],
    repaymentPeriod: '1 month',
    icon: '🛒',
    color: 'from-blue-50 to-indigo-50',
  },
  {
    id: 'micro-business',
    code: 'MC-MICRO',
    name: 'Micro Business Loan',
    description: 'Empower your small business with working capital.',
    minAmount: 2001,
    maxAmount: 5000,
    requirements: [
      'Business activity verification',
      'Collateral valued at 2× loan amount',
    ],
    repaymentPeriod: '2 months',
    icon: '🏪',
    color: 'from-yellow-50 to-amber-50',
  },
  {
    id: 'sme1',
    code: 'MC-SME1',
    name: 'Small Enterprise Loan',
    description: 'Grow your small enterprise with tailored financing.',
    minAmount: 5001,
    maxAmount: 10000,
    requirements: [
      'Business records',
      'Cash flow review',
      'Collateral valued at 2× loan amount',
    ],
    repaymentPeriod: '3 months',
    icon: '📈',
    color: 'from-purple-50 to-violet-50',
  },
  {
    id: 'sme2',
    code: 'MC-SME2',
    name: 'SME Growth Loan',
    description: 'Scale your business with substantial growth capital.',
    minAmount: 10001,
    maxAmount: 20000,
    requirements: [
      'Financial statements',
      'Business assessment',
      'Collateral valued at 2× loan amount',
    ],
    repaymentPeriod: '4 months',
    icon: '🚀',
    color: 'from-rose-50 to-pink-50',
  },
];

export const LoanProducts: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Loan Products
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From nano loans to SME growth capital — we offer flexible lending
          solutions to help you maximize your cash.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
          <span className="px-3 py-1 bg-gray-100 rounded-full">💰 Lending</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">📱 Digital & Telecom</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">📦 General Trade</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">📊 Consultancy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loanProducts.map((product) => (
          <Card key={product.id} className={`bg-gradient-to-br ${product.color} hover:shadow-lg transition-shadow duration-200 border-0`}>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{product.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    <span className="text-xs font-mono bg-gray-200 px-2 py-0.5 rounded">
                      {product.code}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(product.minAmount)} – {formatCurrency(product.maxAmount)}
                  </p>
                  <p className="text-xs text-gray-500">Amount Range</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">{product.description}</p>

              <div className="mt-3">
                <p className="text-xs font-medium text-gray-700">Requirements:</p>
                <ul className="mt-1 space-y-0.5">
                  {product.requirements.map((req, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-green-500">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  📅 Repayment: <span className="font-medium text-gray-700">{product.repaymentPeriod}</span>
                </span>
                <Link to={ROUTES.APPLY}>
                  <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          Need a customized solution?{' '}
          <Link to={ROUTES.CONTACT} className="text-primary-600 hover:underline font-medium">
            Contact us
          </Link>{' '}
          for personalized lending and financial services.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          <span className="text-gray-500">📞 +231 123 456 789</span>
          <span className="text-gray-500">📧 info@maxcash.com</span>
          <span className="text-gray-500">📍 Monrovia, Liberia</span>
        </div>
      </div>
    </div>
  );
};
