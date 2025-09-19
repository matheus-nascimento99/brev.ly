import type { Link } from '@/dtos/link'
import { api } from '@/lib/axios'

type FetchLinksResponse = {
  links: Link[]
}

export const fetchLinks = async () => {
  const result = await api.get<FetchLinksResponse>(`/links`)

  return {
    links: result.data.links,
  }
}
