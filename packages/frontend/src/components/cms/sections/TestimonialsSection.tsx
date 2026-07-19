import React from 'react';
import { useCmsTestimonials } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

const renderStars = (rating: number = 0) => {
  return '⭐'.repeat(Math.min(rating, 5)) + '☆'.repeat(Math.max(0, 5 - rating));
};

export const TestimonialsSection: React.FC = () => {
  const { data, isLoading } = useCmsTestimonials();

  if (isLoading) return <CMSLoadingSkeleton count={2} />;

  return (
    <CMSContentGrid title="💬 Testimonials" badgeCount={data?.length} columns={{ sm: 1, md: 2, lg: 2 }}>
      {data?.map((item) => (
        <CMSContentCard
          key={item._id}
          title={item.author}
          subtitle={item.role ? `${item.role}${item.company ? ` • ${item.company}` : ''}` : item.company}
          description={item.content}
          badge={item.featured ? 'Featured' : undefined}
          badgeVariant={item.featured ? 'warning' : 'default'}
          icon="💬"
        >
          <div className="mt-2 text-sm">{renderStars(item.rating)}</div>
        </CMSContentCard>
      ))}
    </CMSContentGrid>
  );
};
