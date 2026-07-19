import { useQuery } from '@tanstack/react-query'
import { sanityClient, CMS_QUERIES } from '../../api/cmsApi'
import type { CMSStats } from '../../../types/cms.types'

export const useCmsStats = () => {
  return useQuery({
    queryKey: ['cms', 'stats'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSStats>(CMS_QUERIES.getCMSStats)
      return data
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
