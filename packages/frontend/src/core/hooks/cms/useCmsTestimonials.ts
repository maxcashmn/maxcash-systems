import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'
import type { CMSTestimonial } from '../../../types/cms.types'

export const useCmsTestimonials = () => {
  return useQuery({
    queryKey: ['cms', 'testimonials'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSTestimonial[]>(
        `*[_type == "testimonial"] | order(date desc) {
          _id,
          author,
          role,
          company,
          content,
          rating,
          featured,
          date
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
