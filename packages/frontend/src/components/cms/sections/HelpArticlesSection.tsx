import React from 'react';
import { useCmsHelpArticles } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const HelpArticlesSection: React.FC = () => {
  const { data, isLoading } = useCmsHelpArticles();

  if (isLoading) return <CMSLoadingSkeleton count={3} type="grid" />;

  return (
    <CMSContentGrid title="🆘 Help Articles" badgeCount={data?.length}>
      {data?.map((article) => (
        <CMSContentCard
          key={article._id}
          title={article.title}
          subtitle={article.category?.title || 'Uncategorized'}
          icon="��"
        />
      ))}
    </CMSContentGrid>
  );
};
