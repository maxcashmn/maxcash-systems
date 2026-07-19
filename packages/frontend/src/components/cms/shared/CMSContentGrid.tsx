import React, { ReactNode } from 'react';

interface CMSContentGridProps {
  title?: string;
  icon?: string;
  badge?: string;
  badgeCount?: number;
  children: ReactNode;
  emptyMessage?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export const CMSContentGrid: React.FC<CMSContentGridProps> = ({
  title,
  icon,
  badge,
  badgeCount,
  children,
  emptyMessage = 'No content available',
  columns = { sm: 2, md: 3, lg: 4 },
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const isEmpty = !childrenArray.length || childrenArray.every(child => !child);

  const gridClasses = [
    'grid',
    `grid-cols-${columns.sm || 2}`,
    `md:grid-cols-${columns.md || 3}`,
    `lg:grid-cols-${columns.lg || 4}`,
    'gap-3',
  ].join(' ');

  return (
    <div className="space-y-3">
      {(title || badge) && (
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          {badgeCount !== undefined && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {badgeCount}
            </span>
          )}
        </div>
      )}

      {isEmpty ? (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <p className="text-sm text-gray-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className={gridClasses}>{children}</div>
      )}
    </div>
  );
};
