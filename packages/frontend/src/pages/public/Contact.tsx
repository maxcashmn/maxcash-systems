import React, { useState } from 'react';
import { useToast } from '../../core/hooks/useToast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/forms/TextArea';
import { Card } from '../../components/ui/Card';

export const Contact: React.FC = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Integrate with EmailJS or backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need assistance? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+231 123 456 789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input
                  label="Subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <TextArea
                  label="Message"
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" loading={loading} fullWidth>
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500">📍 Address</p>
                  <p className="text-gray-900">Monrovia, Liberia</p>
                </div>
                <div>
                  <p className="text-gray-500">📞 Phone</p>
                  <p className="text-gray-900">+231 123 456 789</p>
                </div>
                <div>
                  <p className="text-gray-500">📧 Email</p>
                  <p className="text-gray-900">info@maxcash.com</p>
                </div>
                <div>
                  <p className="text-gray-500">🕐 Hours</p>
                  <p className="text-gray-900">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-900">Sat: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
