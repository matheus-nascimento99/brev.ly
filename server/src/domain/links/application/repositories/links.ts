import type { UniqueEntityId } from '../../../../core/value-objects/unique-entity-id.ts'
import type { Link } from '../../enterprise/entities/link.ts'
import type { Raw } from '../../enterprise/value-objects/raw.ts'

export abstract class LinksRepository {
  abstract create(link: Link): Promise<void>

  abstract findById(linkId: UniqueEntityId): Promise<Link | null>
  abstract findMany(): Promise<Link[]>
  abstract findByShortUrl(shortUrl: Raw): Promise<Link | null>

  abstract save(linkId: UniqueEntityId, link: Link): Promise<void>

  abstract streamLinks(): AsyncIterable<Link[]>

  abstract delete(linkId: UniqueEntityId): Promise<void>
}
