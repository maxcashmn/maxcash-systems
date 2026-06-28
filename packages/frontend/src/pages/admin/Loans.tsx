import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Loader } from '../../components/ui/Loader';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

export const Loans: React.FC = () => {
  const toast = useToast();
  const [loans, setLoans] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const { execute: fetchLoans, isLoading } = useApi(loanApi.listLoans);
  const { execute: approveLoan } = useApi(loanApi.approveLoan);
  const { execute: rejectLoan } = useApi(loanApi.rejectLoan);
  const { execute: disburseLoan } = useApi(loanApi.disburseLoan);

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const data = await fetchLoans();
        if (data) {
          setLoans(data.data || []);
        }
      } catch (error) {
        toast.error('Failed to load loans');
      }
    };
    loadLoans();
  }, []);

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.purpose.toLowerCase().includes(search.toLowerCase()) ||
      loan.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || loan.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAction = async (loanId: string, action: 'approve' | 'reject' | 'disburse') => {
    try {
      if (action === 'approve') await approveLoan(loanId);
      else if (action === 'reject') await rejectLoan(loanId, 'Admin action');
      else if (action === 'disburse') await disburseLoan(loanId);
      toast.success(`Loan ${action}d successfully`);
      const data = await fetchLoans();
      if (data) setLoans(data.data || []);
    } catch (error) {
      toast.error(`Failed to ${action} loan`);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Loan Management</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search loans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Loans</option>
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="disbursed">Disbursed</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="defaulted">Defaulted</option>
        </select>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Purpose</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Term</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{formatCurrency(loan.amount)}</td>
                  <td className="py-3 px-4 text-sm">{loan.purpose}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                      {loan.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{loan.termMonths} months</td>
                  <td className="py-3 px-4 text-sm">{formatDate(loan.createdAt)}</td>
                  <td className="py-3 px-4 space-x-2">
                    {loan.status === 'pending' && (
                      <>
                        <Button size="sm" variant="success" onClick={() => handleAction(loan.id, 'approve')}>
                          Approve
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleAction(loan.id, 'reject')}>
                          Reject
                        </Button>
                      </>
                    )}
                    {loan.status === 'approved' && (
                      <Button size="sm" variant="primary" onClick={() => handleAction(loan.id, 'disburse')}>
                        Disburse
                      </Button>
                    )}
                    <span className="text-xs text-gray-400">ID: {loan.id.slice(0, 8)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLoans.length === 0 && (
          <p className="text-center text-gray-500 py-8">No loans found.</p>
        )}
      </Card>
    </div>
  );
};
