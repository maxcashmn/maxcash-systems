import React from 'react';
import { useCmsStats } from '../../../core/hooks/cms';
import { Card } from '../../ui/Card';
import { CMSLoadingSkeleton } from '../shared';

const StatCard: React.FC<{ label: string; value: number; icon: string }> = ({
  label,
  value,
  icon,
}) => (
  <Card className="p-4 text-center">
    <p className="text-2xl">{icon}</p>
    <p className="text-xl font-bold text-gray-900">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </Card>
);

export const CMSSummarySection: React.FC = () => {
  const { data, isLoading } = useCmsStats();

  if (isLoading) return <CMSLoadingSkeleton count={6} type="grid" />;

  if (!data) return null;

  const stats = [
    { label: 'Pages', value: data.pages, icon: '📄' },
    { label: 'Blog Posts', value: data.posts, icon: '📝' },
    { label: 'FAQs', value: data.faqs, icon: '❓' },
    { label: 'Products', value: data.products, icon: '💼' },
    { label: 'Announcements', value: data.announcementsActive, icon: '📢' },
    { label: 'Legal Docs', value: data.legal, icon: '⚖️' },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span>📊</span> CMS Overview
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};
