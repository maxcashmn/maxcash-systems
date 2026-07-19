import React from 'react';
import { useCmsLoanProducts } from '../../../core/hooks/cms';
import { CMSContentCard, CMSLoadingSkeleton, CMSContentGrid } from '../shared';

export const LoanProductsSection: React.FC = () => {
  const { data, isLoading } = useCmsLoanProducts();

  if (isLoading) return <CMSLoadingSkeleton count={3} type="grid" />;

  return (
    <CMSContentGrid title="💼 Loan Products" badgeCount={data?.length}>
      {data?.map((product) => (
        <CMSContentCard
          key={product._id}
          title={product.name}
          subtitle={`${product.interestRate}% APR • $${product.minAmount} - $${product.maxAmount}`}
          description={product.description}
          badge={product.isActive ? 'Active' : 'Inactive'}
          badgeVariant={product.isActive ? 'success' : 'default'}
          icon="💼"
        />
      ))}
    </CMSContentGrid>
  );
};
