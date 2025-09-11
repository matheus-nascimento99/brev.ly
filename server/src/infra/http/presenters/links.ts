/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import z from 'zod'
import type { Link } from '../../../domain/links/enterprise/entities/link'

export const linkPresenterSchema = z.object({
  id: z.uuid(),
  original_url: z.url(),
  short_url: z.string(),
  access_count: z.number().nonnegative(),
  created_at: z.date(),
})

type LinkPresenter = z.input<typeof linkPresenterSchema>

export class LinksPresenter {
  static toHTTP(link: Link): LinkPresenter {
    return {
      id: link.id.toString(),
      original_url: link.originalUrl,
      short_url: link.shortUrl.value,
      access_count: link.accessCount,
      created_at: link.createdAt,
    }
  }
}
