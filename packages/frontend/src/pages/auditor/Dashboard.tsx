import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { transactionApi } from '../../core/api/transactionApi';
import { formatCurrency } from '../../core/utils/formatters';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [loans, setLoans] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalLoans: 0,
    totalDisbursed: 0,
    totalTransactions: 0,
  });

  const { execute: fetchLoans, isLoading: loansLoading } = useApi(loanApi.listLoans);
  const { execute: fetchTransactions, isLoading: transactionsLoading } = useApi(transactionApi.listTransactions);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loansData = await fetchLoans();
        if (loansData) {
          const allLoans = loansData.data || [];
          setLoans(allLoans);
          const disbursed = allLoans.filter((l: any) => l.status === 'disbursed' || l.status === 'active');
          setStats({
            totalLoans: allLoans.length,
            totalDisbursed: disbursed.reduce((sum: number, l: any) => sum + l.amount, 0),
            totalTransactions: 0,
          });
        }

        const transactionsData = await fetchTransactions();
        if (transactionsData) {
          setTransactions(transactionsData.data || []);
          setStats((prev) => ({
            ...prev,
            totalTransactions: transactionsData.data?.length || 0,
          }));
        }
      } catch (error) {
        toast.error('Failed to load audit data');
      }
    };
    loadData();
  }, []);

  if (loansLoading || transactionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Auditor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}! Monitor and audit loan activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Total Loans</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalLoans}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Disbursed</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalDisbursed)}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Recent Loans</h3>
          {loans.slice(0, 5).map((loan) => (
            <div key={loan.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium">{formatCurrency(loan.amount)}</p>
                <p className="text-sm text-gray-500">{loan.status}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(loan.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                <p className="text-sm text-gray-500">{transaction.type}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(transaction.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
