import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '../../api/cmsApi'
import type { CMSTeamMember } from '../../../types/cms.types'

export const useCmsTeamMembers = () => {
  return useQuery({
    queryKey: ['cms', 'team'],
    queryFn: async () => {
      const data = await sanityClient.fetch<CMSTeamMember[]>(
        `*[_type == "teamMember"] | order(name asc) {
          _id,
          name,
          role,
          email,
          bio,
          avatar,
          isActive
        }`
      )
      return data
    },
    staleTime: 1000 * 60 * 5,
  })
}
