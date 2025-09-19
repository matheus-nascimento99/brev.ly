import { api } from '@/lib/axios'

type CreateLinkRequest = {
  originalUrl: string
  shortUrl: string
}

export const createLink = async (data: CreateLinkRequest) => {
  await api.post('/links', data)
}
