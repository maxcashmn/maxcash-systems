import React from 'react';
import { Button } from '../ui/Button';

interface TableActionProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const TableAction: React.FC<TableActionProps> = ({
  label,
  onClick,
  variant = 'secondary',
  size = 'sm',
  icon,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className="inline-flex items-center gap-1"
    >
      {icon && <span>{icon}</span>}
      {label}
    </Button>
  );
};
