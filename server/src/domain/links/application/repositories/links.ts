import type { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import type { Link } from '../../enterprise/entities/link'
import type { Raw } from '../../enterprise/value-objects/raw'

export abstract class LinksRepository {
  abstract create(link: Link): Promise<void>

  abstract findById(linkId: UniqueEntityId): Promise<Link | null>
  abstract findMany(): Promise<Link[]>
  abstract findByShortUrl(shortUrl: Raw): Promise<Link | null>

  abstract save(linkId: UniqueEntityId, link: Link): Promise<void>

  abstract delete(linkId: UniqueEntityId): Promise<void>
}
