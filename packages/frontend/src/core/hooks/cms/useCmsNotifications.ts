import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'

export const useCmsNotifications = () => {
  return useQuery({
    queryKey: ['cms', 'notifications'],
    queryFn: async () => {
      const data = await sanityClient.fetch(
        `*[_type == "notification"] | order(sentAt desc) [0...5] {
          _id,
          title,
          message,
          type,
          isRead,
          sentAt
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 2,
  })
}
