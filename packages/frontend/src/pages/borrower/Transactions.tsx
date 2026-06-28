import React from 'react';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';

export const Transactions: React.FC = () => {
  const [loading] = React.useState(false);
  const [transactions] = React.useState([]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <Card>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No transactions yet.</p>
        ) : (
          <div>Transaction list</div>
        )}
      </Card>
    </div>
  );
};
