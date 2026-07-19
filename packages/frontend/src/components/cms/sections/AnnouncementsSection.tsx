import React from 'react';
import { useCmsAnnouncements } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const AnnouncementsSection: React.FC = () => {
  const { data, isLoading } = useCmsAnnouncements();

  if (isLoading) return <CMSLoadingSkeleton count={2} />;

  return (
    <CMSContentGrid title="📢 Announcements" badgeCount={data?.length}>
      {data?.map((item) => {
        // Map announcement type to Badge variant
        let badgeVariant: 'default' | 'success' | 'warning' | 'primary' | 'danger' | 'info' = 'default';
        if (item.type === 'success') badgeVariant = 'success';
        else if (item.type === 'warning') badgeVariant = 'warning';
        else if (item.type === 'error') badgeVariant = 'danger';
        else if (item.type === 'info') badgeVariant = 'info';

        return (
          <CMSContentCard
            key={item._id}
            title={item.title}
            description={item.content}
            badge={item.type}
            badgeVariant={badgeVariant}
            icon="📢"
          />
        );
      })}
    </CMSContentGrid>
  );
};
