import React from 'react';
import { Card } from '../../ui/Card';

interface CMSLoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'grid';
}

export const CMSLoadingSkeleton: React.FC<CMSLoadingSkeletonProps> = ({
  count = 3,
  type = 'card',
}) => {
  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(count)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
