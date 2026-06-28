import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/forms/TextArea';
import { Loader } from '../../components/ui/Loader';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi } from '../../core/api/loanApi';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

export const ReviewApplications: React.FC = () => {
  const [searchParams] = useSearchParams();
  const loanId = searchParams.get('loan');
  const toast = useToast();
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const { execute: fetchLoans, isLoading } = useApi(loanApi.listLoans);
  const { execute: approveLoan, isLoading: approving } = useApi(loanApi.approveLoan);
  const { execute: rejectLoan, isLoading: rejecting } = useApi(loanApi.rejectLoan);

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const data = await fetchLoans();
        if (data) {
          const pendingLoans = data.data?.filter((l: any) => l.status === 'pending' || l.status === 'under_review') || [];
          setLoans(pendingLoans);
          if (loanId) {
            const found = pendingLoans.find((l: any) => l.id === loanId);
            if (found) setSelectedLoan(found);
          }
        }
      } catch (error) {
        toast.error('Failed to load applications');
      }
    };
    loadLoans();
  }, [loanId]);

  const handleApprove = async () => {
    if (!selectedLoan) return;
    try {
      await approveLoan(selectedLoan.id, { notes: reviewNotes });
      toast.success('Loan approved successfully!');
      setSelectedLoan(null);
      // Refresh list
      const data = await fetchLoans();
      if (data) {
        setLoans(data.data?.filter((l: any) => l.status === 'pending' || l.status === 'under_review') || []);
      }
    } catch (error) {
      toast.error('Failed to approve loan');
    }
  };

  const handleReject = async () => {
    if (!selectedLoan) return;
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    try {
      await rejectLoan(selectedLoan.id, rejectionReason);
      toast.success('Loan rejected');
      setSelectedLoan(null);
      setRejectionReason('');
      const data = await fetchLoans();
      if (data) {
        setLoans(data.data?.filter((l: any) => l.status === 'pending' || l.status === 'under_review') || []);
      }
    } catch (error) {
      toast.error('Failed to reject loan');
    }
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
      <h1 className="text-2xl font-bold text-gray-900">Review Applications</h1>

      {selectedLoan ? (
        <Card>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Loan Application</h2>
                <p className="text-sm text-gray-500">Application ID: {selectedLoan.id}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedLoan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {selectedLoan.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold">{formatCurrency(selectedLoan.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Term</p>
                <p className="font-semibold">{selectedLoan.termMonths} months</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purpose</p>
                <p className="font-semibold">{selectedLoan.purpose}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="font-semibold">{formatCurrency(selectedLoan.monthlyIncome)}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Employment Status</p>
              <p className="font-semibold">{selectedLoan.employmentStatus}</p>
            </div>

            <TextArea
              label="Review Notes"
              placeholder="Add your review notes here..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={3}
            />

            <div className="flex gap-4">
              <Button variant="success" onClick={handleApprove} loading={approving}>
                Approve
              </Button>
              <Button variant="danger" onClick={handleReject} loading={rejecting}>
                Reject
              </Button>
              <Button variant="secondary" onClick={() => setSelectedLoan(null)}>
                Back to List
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <>
          {loans.length === 0 ? (
            <Card>
              <p className="text-gray-500 text-center py-12">No pending applications to review.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {loans.map((loan) => (
                <Card key={loan.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{formatCurrency(loan.amount)}</p>
                    <p className="text-sm text-gray-500">{loan.purpose}</p>
                    <p className="text-xs text-gray-400">Applied: {formatDate(loan.createdAt)}</p>
                  </div>
                  <Button onClick={() => setSelectedLoan(loan)}>Review</Button>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
