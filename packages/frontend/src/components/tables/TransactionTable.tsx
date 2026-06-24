import React from 'react';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '../ui/Table';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { formatCurrency, formatDateTime } from '../../core/utils/formatters';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
  description?: string;
  createdAt: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onView?: (transaction: Transaction) => void;
  loading?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onView,
  loading = false,
}) => {
  if (loading) {
    return <div className="text-center py-8">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center py-8 text-gray-500">No transactions found</div>;
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      deposit: 'text-green-600',
      withdrawal: 'text-red-600',
      transfer: 'text-blue-600',
      loan_disbursement: 'text-indigo-600',
      loan_repayment: 'text-emerald-600',
      interest: 'text-yellow-600',
      fee: 'text-gray-600',
    };
    return colors[type] || 'text-gray-600';
  };

  const formatType = (type: string) => {
    return type.replace('_', ' ').toUpperCase();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Reference</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell align="right">Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className={getTypeColor(transaction.type)}>
              {formatType(transaction.type)}
            </TableCell>
            <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(Math.abs(transaction.amount))}
            </TableCell>
            <TableCell><StatusPill status={transaction.status} /></TableCell>
            <TableCell className="font-mono text-xs">{transaction.reference}</TableCell>
            <TableCell>{transaction.description || '-'}</TableCell>
            <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
            <TableCell align="right">
              {onView && (
                <Button size="sm" variant="secondary" onClick={() => onView(transaction)}>
                  View
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
