import { useQuery } from '@tanstack/react-query'
import { sanityClient, CMS_QUERIES } from '../../api/cmsApi'
import type { CMSLegalDocument } from '../../../types/cms.types'

export const useCmsLegalDocuments = () => {
  return useQuery({
    queryKey: ['cms', 'legal'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSLegalDocument[]>(
        CMS_QUERIES.getLegalDocuments
      )
      return data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}
