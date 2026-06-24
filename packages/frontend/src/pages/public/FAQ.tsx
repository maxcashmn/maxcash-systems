import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is MaxCash?',
    answer: 'MaxCash is a financial and business services company that provides lending, digital/telecom services, general trade, and business consultancy to help individuals and businesses maximize their cash potential.',
  },
  {
    category: 'General',
    question: 'Who can use MaxCash services?',
    answer: 'We serve both individuals and small businesses. Whether you need a loan, telecom services, or business consultancy, we have solutions for you.',
  },
  {
    category: 'Lending',
    question: 'What types of loans do you offer?',
    answer: 'We offer short-term micro-loans, business credit facilities, and professional money lending services. Loan amounts range from $50 to $5,000 depending on your needs and eligibility.',
  },
  {
    category: 'Lending',
    question: 'How do I apply for a loan?',
    answer: 'You can apply online through our application portal, or visit our office. The process is quick and straightforward.',
  },
  {
    category: 'Digital',
    question: 'What digital services do you offer?',
    answer: 'We are authorized agents for Lonestar MTN and Orange Money. We offer mobile money services, airtime, data bundles, SIM cards, and mobile accessories.',
  },
  {
    category: 'Digital',
    question: 'Do you sell airtime and data bundles?',
    answer: 'Yes! We offer both retail and wholesale airtime, scratch cards, and data bundles for all major networks.',
  },
  {
    category: 'Trade',
    question: 'What kind of merchandise do you trade?',
    answer: 'We import, distribute, and sell general merchandise including electronics, household goods, and business supplies.',
  },
  {
    category: 'Consultancy',
    question: 'What business consultancy services do you offer?',
    answer: 'We provide business planning, financial advisory, market analysis, operational support, and growth strategy services to help your business succeed.',
  },
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(faqs.map(f => f.category))];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === selectedCategory);

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our services.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-4 focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-400">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {faq.answer}
                  <div className="mt-2">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
