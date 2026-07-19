import React from 'react';
import { useCmsFAQs } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const FAQsSection: React.FC = () => {
  const { data, isLoading } = useCmsFAQs();

  if (isLoading) return <CMSLoadingSkeleton count={3} />;

  return (
    <CMSContentGrid title="❓ FAQs" badgeCount={data?.length} columns={{ sm: 1, md: 2, lg: 2 }}>
      {data?.map((faq) => (
        <CMSContentCard
          key={faq._id}
          title={faq.question}
          badge={faq.category}
          icon="❓"
        />
      ))}
    </CMSContentGrid>
  );
};
