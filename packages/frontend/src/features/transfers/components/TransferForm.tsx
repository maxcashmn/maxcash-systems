import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useToast } from '../../../core/hooks/useToast';

export const TransferForm: React.FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    toUserId: '',
    amount: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement transfer logic
    toast.success('Transfer initiated successfully');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Recipient User ID"
        placeholder="Enter user ID"
        value={formData.toUserId}
        onChange={(e) => setFormData({ ...formData, toUserId: e.target.value })}
        required
      />
      <Input
        label="Amount"
        type="number"
        placeholder="0.00"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
      />
      <Input
        label="Description"
        placeholder="Transfer description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <Button type="submit" loading={loading} fullWidth>
        Send Transfer
      </Button>
    </form>
  );
};
