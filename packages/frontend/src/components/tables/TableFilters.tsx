import React from 'react';
import { Select } from '../forms/Select';

interface FilterOption {
  value: string;
  label: string;
}

interface TableFiltersProps {
  filters: {
    key: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  className?: string;
}

export const TableFilters: React.FC<TableFiltersProps> = ({ filters, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-3 items-end ${className}`}>
      {filters.map((filter) => (
        <div key={filter.key} className="w-48">
          <Select
            label={filter.label}
            options={filter.options}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};
