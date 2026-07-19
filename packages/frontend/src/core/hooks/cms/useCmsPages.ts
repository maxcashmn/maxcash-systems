import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'
import type { CMSPage } from '../../../types/cms.types'

export const useCmsPages = () => {
  return useQuery({
    queryKey: ['cms', 'pages'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSPage[]>(
        `*[_type == "page"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          description,
          publishedAt
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
