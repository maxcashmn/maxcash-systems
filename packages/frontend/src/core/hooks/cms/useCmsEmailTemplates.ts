import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'

export const useCmsEmailTemplates = () => {
  return useQuery({
    queryKey: ['cms', 'email', 'templates'],
    queryFn: async () => {
      const data = await sanityClient.fetch(
        `*[_type == "emailTemplate"] | order(name asc) {
          _id,
          name,
          subject,
          type,
          isActive
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
