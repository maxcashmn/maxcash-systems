import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'
import type { CMSHelpArticle } from '../../../types/cms.types'

export const useCmsHelpArticles = () => {
  return useQuery({
    queryKey: ['cms', 'help', 'articles'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSHelpArticle[]>(
        `*[_type == "article"] | order(order asc) {
          _id,
          title,
          slug,
          category->{ title },
          order
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
