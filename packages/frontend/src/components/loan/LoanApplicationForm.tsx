import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../forms/Select';
import { TextArea } from '../forms/TextArea';
import { Card } from '../ui/Card';
import { apiClient } from '../../core/api/client';
import { formatCurrency } from '../../core/utils/formatters';

const serviceOptions = [
  { value: 'lending', label: 'Lending & Credit' },
  { value: 'digital', label: 'Digital & Telecom' },
  { value: 'trade', label: 'General Trade' },
  { value: 'consultancy', label: 'Business Consultancy' },
];

interface LoanApplicationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  compact?: boolean;
}

export const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ 
  onSuccess, 
  onCancel, 
  compact = false 
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: '',
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    amount: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.service) {
      toast.error('Please select a service');
      return;
    }

    setLoading(true);
    
    try {
      const response = await apiClient.post('/api/v1/applications', {
        service: formData.service,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        amount: formData.amount ? Number(formData.amount) : undefined,
        message: formData.message,
      });
      
      toast.success('Application submitted successfully! We\'ll contact you soon.');
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={compact ? 'p-4' : ''}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Service"
          options={serviceOptions}
          placeholder="Select a service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+231 123 456 789"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Business Name"
            placeholder="Your business name (if applicable)"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>

        {formData.service === 'lending' && (
          <Input
            label="Amount Requested ($)"
            type="number"
            placeholder="5000"
            min="1"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        )}

        <TextArea
          label="Additional Information"
          placeholder="Tell us more about your needs..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={compact ? 3 : 4}
        />

        <div className={`flex ${compact ? 'flex-col sm:flex-row gap-2' : 'gap-4'}`}>
          <Button type="submit" loading={loading} fullWidth={compact} size={compact ? 'md' : 'lg'}>
            Submit Application
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel} fullWidth={compact}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
