import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/forms/Select';
import { TextArea } from '../../components/forms/TextArea';
import { Card } from '../../components/ui/Card';
import { apiClient } from '../../core/api/client';

const serviceOptions = [
  { value: 'lending', label: 'Lending & Credit' },
  { value: 'digital', label: 'Digital & Telecom' },
  { value: 'trade', label: 'General Trade' },
  { value: 'consultancy', label: 'Business Consultancy' },
];

export const Apply: React.FC = () => {
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
      // Send to backend
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
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Apply Now</h1>
          <p className="mt-4 text-lg text-gray-600">
            Start maximizing your cash with MaxCash services.
          </p>
        </div>

        <Card>
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
              rows={4}
            />

            <Button type="submit" loading={loading} fullWidth size="lg">
              Submit Application
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
