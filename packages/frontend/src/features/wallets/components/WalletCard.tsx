import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatCurrency } from '../../../core/utils/formatters';

interface WalletCardProps {
  balance: number;
  currency: string;
  onFund?: () => void;
  onWithdraw?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  currency,
  onFund,
  onWithdraw,
}) => {
  return (
    <Card>
      <div className="text-center">
        <p className="text-sm text-gray-500">Available Balance</p>
        <p className="text-3xl font-bold text-gray-900 my-2">
          {formatCurrency(balance, currency)}
        </p>
        <div className="flex gap-3 justify-center mt-4">
          {onFund && <Button onClick={onFund}>Fund Wallet</Button>}
          {onWithdraw && <Button variant="secondary" onClick={onWithdraw}>Withdraw</Button>}
        </div>
      </div>
    </Card>
  );
};
