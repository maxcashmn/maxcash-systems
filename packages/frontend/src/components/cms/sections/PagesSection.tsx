import React from 'react';
import { useCmsPages } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const PagesSection: React.FC = () => {
  const { data, isLoading } = useCmsPages();

  if (isLoading) return <CMSLoadingSkeleton count={3} type="grid" />;

  return (
    <CMSContentGrid title="📄 Pages" badgeCount={data?.length}>
      {data?.map((page) => (
        <CMSContentCard
          key={page._id}
          title={page.title}
          subtitle={`/${page.slug?.current || ''}`}
          description={page.description}
          icon="📄"
        />
      ))}
    </CMSContentGrid>
  );
};
