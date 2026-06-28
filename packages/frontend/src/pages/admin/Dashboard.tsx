import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { userApi } from '../../core/api/userApi';
import { loanApi } from '../../core/api/loanApi';
import { transactionApi } from '../../core/api/transactionApi';
import { formatCurrency } from '../../core/utils/formatters';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLoans: 0,
    totalTransactions: 0,
    totalAmount: 0,
  });

  const { execute: fetchUsers, isLoading: usersLoading } = useApi(userApi.listUsers);
  const { execute: fetchLoans, isLoading: loansLoading } = useApi(loanApi.listLoans);
  const { execute: fetchTransactions, isLoading: transactionsLoading } = useApi(transactionApi.listTransactions);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        const loansData = await fetchLoans();
        const transactionsData = await fetchTransactions();

        if (usersData) {
          setStats((prev) => ({ ...prev, totalUsers: usersData.data?.length || 0 }));
        }

        if (loansData) {
          const allLoans = loansData.data || [];
          const totalAmount = allLoans.reduce((sum: number, l: any) => sum + l.amount, 0);
          setStats((prev) => ({
            ...prev,
            totalLoans: allLoans.length,
            totalAmount,
          }));
        }

        if (transactionsData) {
          setStats((prev) => ({
            ...prev,
            totalTransactions: transactionsData.data?.length || 0,
          }));
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      }
    };
    loadData();
  }, []);

  if (usersLoading || loansLoading || transactionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}! Manage the entire system.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Loans</p>
          <p className="text-2xl font-bold text-primary-600">{stats.totalLoans}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalAmount)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={() => window.location.href = '/admin/users'} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm">
              👤 Manage Users
            </button>
            <button onClick={() => window.location.href = '/admin/loans'} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm">
              📋 Manage Loans
            </button>
            <button onClick={() => window.location.href = '/admin/audit-logs'} className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm">
              📊 View Audit Logs
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">System Info</h3>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-500">Environment:</span> Production</p>
            <p><span className="text-gray-500">Version:</span> 1.0.0</p>
            <p><span className="text-gray-500">Status:</span> <span className="text-green-600">✅ Online</span></p>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <p className="text-sm text-gray-500">No recent activity to display.</p>
        </Card>
      </div>
    </div>
  );
};
