import type { Link } from '@/dtos/link'
import { api } from '@/lib/axios'

type CreateLinkRequest = {
  originalUrl: string
  shortUrl: string
}

type CreateLinkResponse = {
  link: Link
}

export const createLink = async (data: CreateLinkRequest) => {
  const result = await api.post<CreateLinkResponse>('/links', data)

  return {
    link: result.data.link,
  }
}
