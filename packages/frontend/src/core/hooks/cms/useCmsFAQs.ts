import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'
import type { CMSFAQ } from '../../../types/cms.types'

export const useCmsFAQs = () => {
  return useQuery({
    queryKey: ['cms', 'faqs'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSFAQ[]>(
        `*[_type == "faq"] | order(order asc) {
          _id,
          question,
          answer,
          category,
          order
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
