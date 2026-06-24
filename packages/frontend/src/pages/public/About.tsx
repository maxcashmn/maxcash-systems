import React from 'react';
import { Card } from '../../components/ui/Card';

const values = [
  {
    icon: '🤝',
    title: 'Trust & Integrity',
    description: 'We operate with honesty and transparency in all our dealings.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'We embrace technology to deliver better financial solutions.',
  },
  {
    icon: '📈',
    title: 'Growth',
    description: 'We are committed to helping our clients and community grow.',
  },
  {
    icon: '🤲',
    title: 'Accessibility',
    description: 'We make financial services accessible to everyone.',
  },
];

export const About: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About MaxCash</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We maximize your cash through smart lending, digital services, and business solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              To provide accessible financial services, digital solutions, and business support
              that empower individuals and small businesses to achieve their goals.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
            <p className="mt-2 text-gray-600">
              To be the leading financial and business services provider in Liberia,
              known for innovation, trust, and impact.
            </p>
          </Card>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <Card key={index} hover className="text-center">
              <div className="text-4xl mb-2">{value.icon}</div>
              <h4 className="font-semibold text-gray-900">{value.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* Services Overview */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="font-medium text-gray-900">💰 Lending</p>
              <p className="text-sm text-gray-600">Micro-loans, credit facilities</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">📱 Telecom</p>
              <p className="text-sm text-gray-600">Airtime, data, mobile money</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">📦 Trade</p>
              <p className="text-sm text-gray-600">Importation, distribution</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">📊 Consultancy</p>
              <p className="text-sm text-gray-600">Business support services</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
