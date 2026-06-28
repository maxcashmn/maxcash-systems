import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { formatCurrency } from '../../core/utils/formatters';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [pendingLoans, setPendingLoans] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
  });

  const { execute: fetchLoans, isLoading } = useApi(loanApi.listLoans);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLoans();
        if (data) {
          const loans = data.data || [];
          setPendingLoans(loans.filter((l: any) => l.status === 'pending' || l.status === 'under_review'));
          setStats({
            pending: loans.filter((l: any) => l.status === 'pending').length,
            underReview: loans.filter((l: any) => l.status === 'under_review').length,
            approved: loans.filter((l: any) => l.status === 'approved').length,
            rejected: loans.filter((l: any) => l.status === 'rejected').length,
          });
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}! Review and manage loan applications.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Under Review</p>
          <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => window.location.href = '/manager/review'}>
            Review Applications
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/manager/borrowers'}>
            View Borrowers
          </Button>
        </div>
      </Card>

      {/* Recent Pending Applications */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Applications</h2>
        {pendingLoans.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-8">No pending applications to review.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingLoans.slice(0, 5).map((loan) => (
              <Card key={loan.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{formatCurrency(loan.amount)}</p>
                  <p className="text-sm text-gray-500">{loan.purpose}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {loan.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <Button size="sm" className="ml-2" onClick={() => window.location.href = `/manager/review?loan=${loan.id}`}>
                    Review
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
