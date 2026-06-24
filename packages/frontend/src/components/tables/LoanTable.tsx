import React from 'react';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from '../ui/Table';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

interface Loan {
  id: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  purpose: string;
  status: string;
  createdAt: string;
  monthlyPayment?: number;
}

interface LoanTableProps {
  loans: Loan[];
  onView?: (loan: Loan) => void;
  onAction?: (loan: Loan, action: 'approve' | 'reject' | 'disburse') => void;
  loading?: boolean;
}

export const LoanTable: React.FC<LoanTableProps> = ({
  loans,
  onView,
  onAction,
  loading = false,
}) => {
  if (loading) {
    return <div className="text-center py-8">Loading loans...</div>;
  }

  if (loans.length === 0) {
    return <div className="text-center py-8 text-gray-500">No loans found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Amount</TableHeaderCell>
          <TableHeaderCell>Term</TableHeaderCell>
          <TableHeaderCell>Purpose</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Created</TableHeaderCell>
          <TableHeaderCell align="right">Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id} onClick={() => onView?.(loan)}>
            <TableCell>{formatCurrency(loan.amount)}</TableCell>
            <TableCell>{loan.termMonths} months</TableCell>
            <TableCell>{loan.purpose}</TableCell>
            <TableCell><StatusPill status={loan.status} /></TableCell>
            <TableCell>{formatDate(loan.createdAt)}</TableCell>
            <TableCell align="right">
              <div className="flex gap-2 justify-end">
                {onAction && loan.status === 'pending' && (
                  <>
                    <Button size="sm" variant="success" onClick={(e) => { e.stopPropagation(); onAction(loan, 'approve'); }}>
                      Approve
                    </Button>
                    <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); onAction(loan, 'reject'); }}>
                      Reject
                    </Button>
                  </>
                )}
                {onAction && loan.status === 'approved' && (
                  <Button size="sm" variant="primary" onClick={(e) => { e.stopPropagation(); onAction(loan, 'disburse'); }}>
                    Disburse
                  </Button>
                )}
                {onView && (
                  <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onView(loan); }}>
                    View
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
