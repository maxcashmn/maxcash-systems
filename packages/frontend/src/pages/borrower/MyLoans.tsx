import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { formatCurrency, formatDate } from '../../core/utils/formatters';
import { loanApi } from '../../core/api/loanApi';

export const MyLoans: React.FC = () => {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadLoans = async () => {
      setLoading(true);
      try {
        const response = await loanApi.listLoans();
        console.log('MyLoans response:', response);
        if (response && response.data) {
          setLoans(response.data);
        } else {
          setLoans([]);
        }
      } catch (error) {
        console.error('Error loading loans:', error);
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };
    loadLoans();
  }, []);

  const filteredLoans = filter === 'all' 
    ? loans 
    : loans.filter((loan) => loan.status === filter);

  if (loading) {
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

      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'approved', 'rejected', 'active', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All' : status.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredLoans.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">
            No loans found. <Link to="/loan-application" className="text-primary-600 hover:underline">Apply for a loan</Link>
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLoans.map((loan) => (
            <Card key={loan.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(loan.principal_amount || 0)}
                  </p>
                  <p className="text-sm text-gray-500">{loan.purpose || 'N/A'}</p>
                  <p className="text-xs text-gray-400">{formatDate(loan.created_at || loan.createdAt)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    loan.status === 'active' ? 'bg-green-100 text-green-800' :
                    loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    loan.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    loan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {loan.status?.toUpperCase() || 'UNKNOWN'}
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
