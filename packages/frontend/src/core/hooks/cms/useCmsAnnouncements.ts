import { useQuery } from '@tanstack/react-query'
import { sanityClient, CMS_QUERIES } from '../../api/cmsApi'
import type { CMSAnnouncement } from '../../../types/cms.types'

export const useCmsAnnouncements = () => {
  return useQuery({
    queryKey: ['cms', 'announcements'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSAnnouncement[]>(
        CMS_QUERIES.getActiveAnnouncements
      )
      return data
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
