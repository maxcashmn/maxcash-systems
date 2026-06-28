import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../core/hooks/useAuth';
import { LoanCalculator } from '../../components/loan/LoanCalculator';
import { LoanApplicationForm } from '../../components/loan/LoanApplicationForm';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showCalculator, setShowCalculator] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">Manage your loans and applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
          <div className="mt-3 space-y-2">
            <Button 
              size="sm" 
              fullWidth 
              onClick={() => setShowApplication(!showApplication)}
            >
              {showApplication ? 'Hide Application' : 'Apply for a Loan'}
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              fullWidth
              onClick={() => setShowCalculator(!showCalculator)}
            >
              {showCalculator ? 'Hide Calculator' : 'Loan Calculator'}
            </Button>
            <Link to="/my-loans">
              <Button size="sm" variant="secondary" fullWidth>
                View My Loans
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <h3 className="font-semibold text-gray-900">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-sm text-gray-500">Total Loans</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Loans</p>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
          </div>
        </Card>
      </div>

      {showCalculator && (
        <div className="border-t border-gray-200 pt-6">
          <LoanCalculator />
        </div>
      )}

      {showApplication && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for a Loan</h2>
          <LoanApplicationForm 
            onSuccess={() => {
              setShowApplication(false);
            }}
            onCancel={() => setShowApplication(false)}
            compact
          />
        </div>
      )}
    </div>
  );
};
