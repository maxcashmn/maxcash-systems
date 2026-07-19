import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'
import type { CMSLoanProduct } from '../../../types/cms.types'

export const useCmsLoanProducts = () => {
  return useQuery({
    queryKey: ['cms', 'products'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSLoanProduct[]>(
        `*[_type == "loanProduct"] | order(name asc) {
          _id,
          name,
          slug,
          description,
          minAmount,
          maxAmount,
          interestRate,
          isActive
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
