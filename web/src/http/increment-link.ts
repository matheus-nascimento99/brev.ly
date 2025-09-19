import type { Link } from '@/dtos/link'
import { api } from '@/lib/axios'

type IncrementLinkRequest = {
  linkId: string
}

type IncrementLinkResponse = {
  link: Link
}

export const incrementLink = async ({ linkId }: IncrementLinkRequest) => {
  const result = await api.patch<IncrementLinkResponse>(
    `/links/${linkId}/increments`
  )

  return {
    link: result.data.link,
  }
}
