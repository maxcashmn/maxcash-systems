import React from 'react';
import { useCmsLegalDocuments } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const LegalDocumentsSection: React.FC = () => {
  const { data, isLoading } = useCmsLegalDocuments();

  if (isLoading) return <CMSLoadingSkeleton count={3} type="grid" />;

  return (
    <CMSContentGrid title="⚖️ Legal Documents" badgeCount={data?.length}>
      {data?.map((doc) => (
        <CMSContentCard
          key={doc._id}
          title={doc.title}
          subtitle={`v${doc.version}`}
          badge={doc.isActive ? 'Active' : 'Inactive'}
          badgeVariant={doc.isActive ? 'success' : 'default'}
          icon="⚖️"
        />
      ))}
    </CMSContentGrid>
  );
};
