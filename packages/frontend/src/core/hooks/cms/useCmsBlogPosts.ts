import { useQuery } from '@tanstack/react-query'
import { sanityClient, CMS_QUERIES } from '../../api/cmsApi'
import type { CMSBlogPost } from '../../../types/cms.types'

export const useCmsRecentBlogPosts = () => {
  return useQuery({
    queryKey: ['cms', 'blog', 'recent'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSBlogPost[]>(
        CMS_QUERIES.getRecentBlogPosts
      )
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
