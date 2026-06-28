import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

export const Dashboard: React.FC = () => {
  console.log('🟢 Dashboard component rendering');
  const { user } = useAuth();
  console.log('👤 User:', user);
  const toast = useToast();
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 Dashboard useEffect running');
    const loadLoans = async () => {
      console.log('📊 Loading loans...');
      setLoading(true);
      try {
        const response = await loanApi.listLoans();
        console.log('📊 Response from loanApi.listLoans():', response);
        
        // Check if response has data
        if (response && response.data) {
          console.log('📊 Loans data:', response.data);
          setLoans(response.data);
        } else {
          console.log('📊 No loans data found, response:', response);
          setLoans([]);
        }
      } catch (err) {
        console.error('❌ Error loading loans:', err);
        setError('Failed to load loans');
        toast.error('Failed to load loans');
      } finally {
        console.log('📊 Setting loading to false');
        setLoading(false);
      }
    };
    loadLoans();
  }, []);

  console.log('🔄 Loading state:', loading);
  console.log('🔄 Loans state:', loans);

  if (loading) {
    console.log('⏳ Showing spinner');
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    console.log('❌ Showing error:', error);
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <p className="text-red-600">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );
  }

  console.log('✅ Dashboard rendering with data, loans count:', loans.length);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">Here's an overview of your loans.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Total Loans</p>
          <p className="text-2xl font-bold text-gray-900">{loans.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Active Loans</p>
          <p className="text-2xl font-bold text-green-600">
            {loans.filter((l: any) => l.status === 'active' || l.status === 'disbursed').length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Borrowed</p>
          <p className="text-2xl font-bold text-primary-600">
            {formatCurrency(loans.reduce((sum: number, l: any) => sum + (l.principal_amount || 0), 0))}
          </p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4">
          <Link to="/loan-application">
            <Button>Apply for a Loan</Button>
          </Link>
          <Link to="/my-loans">
            <Button variant="secondary">View My Loans</Button>
          </Link>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Loans</h2>
        {loans.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-8">You haven't applied for any loans yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {loans.slice(0, 5).map((loan) => (
              <Card key={loan.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{formatCurrency(loan.principal_amount || 0)}</p>
                  <p className="text-sm text-gray-500">{loan.purpose || 'No purpose'}</p>
                  <p className="text-xs text-gray-400">{formatDate(loan.created_at || loan.createdAt)}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    loan.status === 'active' || loan.status === 'disbursed' ? 'bg-green-100 text-green-800' :
                    loan.status === 'pending' || loan.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                    loan.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {loan.status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
