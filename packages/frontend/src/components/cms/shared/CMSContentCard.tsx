import React, { ReactNode } from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';

// Badge variant types from the Badge component
type BadgeVariant = 'default' | 'success' | 'warning' | 'primary' | 'danger' | 'info';

interface CMSContentCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  children?: ReactNode;
}

export const CMSContentCard: React.FC<CMSContentCardProps> = ({
  title,
  subtitle,
  description,
  badge,
  badgeVariant = 'default',
  icon,
  actionLabel,
  onAction,
  className = '',
  children,
}) => {
  return (
    <Card className={`p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
            {badge && (
              <Badge variant={badgeVariant} className="text-[10px] shrink-0">
                {badge}
              </Badge>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
          {description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>}
        </div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="text-xs text-blue-500 hover:text-blue-700 hover:underline shrink-0 ml-2"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </Card>
  );
};
