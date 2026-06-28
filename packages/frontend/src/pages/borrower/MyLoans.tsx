import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

interface Loan {
  id: string;
  amount: number;
  termMonths: number;
  purpose: string;
  status: string;
  createdAt: string;
  interestRate?: number;
  monthlyPayment?: number;
}

export const MyLoans: React.FC = () => {
  const toast = useToast();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const { execute: fetchLoans } = useApi<{ data: Loan[] }>(loanApi.listLoans);

  const loadLoans = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchLoans();
      if (response && response.data) {
        setLoans(response.data);
      }
    } catch (err) {
      toast.error('Failed to load loans');
      console.error('Failed to load loans:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchLoans, toast]);

  useEffect(() => {
    loadLoans();
  }, [loadLoans]);

  const filteredLoans = filter === 'all' 
    ? loans 
    : loans.filter((loan) => loan.status === filter);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      disbursed: 'bg-indigo-100 text-indigo-800',
      active: 'bg-emerald-100 text-emerald-800',
      completed: 'bg-gray-100 text-gray-800',
      defaulted: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Loans</h1>
        <Link to="/loan-application">
          <Button>Apply for a Loan</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'under_review', 'approved', 'rejected', 'disbursed', 'active', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Loan List */}
      {filteredLoans.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-12">
            No loans found. <Link to="/loan-application" className="text-primary-600 hover:underline">Apply for a loan</Link>
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLoans.map((loan) => (
            <Card key={loan.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(loan.amount)}</p>
                  <p className="text-sm text-gray-500">{loan.purpose}</p>
                  <p className="text-xs text-gray-400">Applied: {formatDate(loan.createdAt)}</p>
                  {loan.interestRate && (
                    <p className="text-xs text-gray-400">Rate: {loan.interestRate}%</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                    {loan.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <Link to={`/my-loans/${loan.id}`}>
                    <Button size="sm" variant="secondary">View Details</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
