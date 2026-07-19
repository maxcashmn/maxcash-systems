import React from 'react';
import { useCmsRecentBlogPosts } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const BlogPostsSection: React.FC = () => {
  const { data, isLoading } = useCmsRecentBlogPosts();

  if (isLoading) return <CMSLoadingSkeleton count={2} />;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <CMSContentGrid title="📝 Blog Posts" badgeCount={data?.length} columns={{ sm: 1, md: 2, lg: 2 }}>
      {data?.map((post) => (
        <CMSContentCard
          key={post._id}
          title={post.title}
          subtitle={post.author?.name || 'Unknown'}
          description={post.excerpt}
          badge={formatDate(post.publishedAt)}
          icon="📝"
        />
      ))}
    </CMSContentGrid>
  );
};
