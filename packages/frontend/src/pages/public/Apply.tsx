import React from 'react';
import { LoanApplicationForm } from '../../components/loan/LoanApplicationForm';

export const Apply: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Apply Now</h1>
          <p className="mt-2 text-lg text-gray-600">
            Start maximizing your cash with MaxCash services.
          </p>
        </div>
        <LoanApplicationForm />
      </div>
    </div>
  );
};
