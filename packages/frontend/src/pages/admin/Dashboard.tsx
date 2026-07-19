import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../core/hooks/useAuth';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { userApi } from '../../core/api/userApi';
import { loanApi } from '../../core/api/loanApi';
import { transactionApi } from '../../core/api/transactionApi';
import { formatCurrency } from '../../core/utils/formatters';

// CMS Components - Reusable
import {
  AnnouncementsSection,
  BlogPostsSection,
  PagesSection,
  LoanProductsSection,
  HelpArticlesSection,
  FAQsSection,
  LegalDocumentsSection,
  TestimonialsSection,
  CMSSummarySection,
} from '../../components/cms';

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

  const isLoading = usersLoading || loansLoading || transactionsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-0 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Welcome back, {user?.firstName}! Full system access.</p>
        </div>
        <Badge variant="outline" className="self-start sm:self-auto text-xs sm:text-sm">
          🔑 Admin
        </Badge>
      </div>

      {/* CMS Announcements */}
      <AnnouncementsSection />

      {/* Backend Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4">
          <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs sm:text-sm text-gray-500">Total Loans</p>
          <p className="text-xl sm:text-2xl font-bold text-primary-600">{stats.totalLoans}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs sm:text-sm text-gray-500">Total Transactions</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs sm:text-sm text-gray-500">Total Amount</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(stats.totalAmount)}</p>
        </Card>
      </div>

      {/* CMS Content Sections - Admin Full Access */}
      <CMSSummarySection />
      <PagesSection />
      <BlogPostsSection />
      <LoanProductsSection />
      <HelpArticlesSection />
      <FAQsSection />
      <LegalDocumentsSection />
      <TestimonialsSection />

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>⚡</span> Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button onClick={() => window.location.href = '/admin/users'} className="w-full">
            👤 Users
          </Button>
          <Button onClick={() => window.location.href = '/admin/loans'} className="w-full">
            📋 Loans
          </Button>
          <Button onClick={() => window.location.href = '/admin/audit-logs'} className="w-full">
            📊 Audit
          </Button>
          <Button onClick={() => window.location.href = '/admin/cms'} className="w-full">
            📝 CMS
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 MaxCash Systems. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Version 1.0.0</span>
            <Badge variant="outline" className="text-[10px]">✅ System Online</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
