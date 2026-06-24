import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const services = [
  {
    id: 'lending',
    icon: '💰',
    title: 'Lending & Credit Services',
    description: 'Short-term micro-loans, credit facilities, and professional money lending for individuals and small businesses.',
    features: [
      'Micro-loans up to $5,000',
      'Business credit facilities',
      'Fast approval process',
      'Flexible repayment terms',
      'Risk management and debt recovery',
    ],
  },
  {
    id: 'digital',
    icon: '📱',
    title: 'Digital & Telecom Services',
    description: 'Authorized agent for Lonestar MTN and Orange Money, plus retail and wholesale of telecom products.',
    features: [
      'Mobile money services (Lonestar MTN & Orange Money)',
      'Airtime and scratch cards',
      'Data bundles',
      'SIM cards',
      'Mobile hardware and accessories',
    ],
  },
  {
    id: 'trade',
    icon: '📦',
    title: 'General Trade',
    description: 'Importation, distribution, and sale of general merchandise to meet your business needs.',
    features: [
      'Importation of goods',
      'Distribution services',
      'Retail and wholesale',
      'Quality merchandise',
      'Competitive pricing',
    ],
  },
  {
    id: 'consultancy',
    icon: '📊',
    title: 'Business Consultancy',
    description: 'Professional business consultancy and support services to help your business thrive.',
    features: [
      'Business planning',
      'Financial advisory',
      'Market analysis',
      'Operational support',
      'Growth strategies',
    ],
  },
];

export const Services: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to maximize your cash and support your growth.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service) => (
            <Card key={service.id} className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-5xl flex-shrink-0">{service.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-primary-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/apply">
            <Button size="lg">Apply Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
