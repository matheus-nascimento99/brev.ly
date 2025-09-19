import type { Link } from '@/dtos/link'
import { api } from '@/lib/axios'

type GetLinkByShortUrlRequest = {
  shortUrl: string
}

type GetLinkByShortUrlResponse = {
  link: Link
}

export const getLinkByShortUrl = async ({
  shortUrl,
}: GetLinkByShortUrlRequest) => {
  const result = await api.get<GetLinkByShortUrlResponse>(
    `/links/${shortUrl}/short`
  )

  return {
    link: result.data.link,
  }
}
