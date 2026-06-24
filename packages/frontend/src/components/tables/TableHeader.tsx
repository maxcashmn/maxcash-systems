import React from 'react';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';

interface TableHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  actionVariant?: 'primary' | 'secondary' | 'outline';
  children?: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onAction,
  actionVariant = 'primary',
  children,
}) => {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      actions={
        <div className="flex gap-3 items-center">
          {children}
          {actionText && onAction && (
            <Button variant={actionVariant} onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      }
    />
  );
};
