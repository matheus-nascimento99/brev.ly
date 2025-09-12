import type { UniqueEntityId } from '../../../../core/value-objects/unique-entity-id.ts'
import type { Link } from '../../enterprise/entities/link.ts'
import type { Raw } from '../../enterprise/value-objects/raw.ts'
import type {
  Csv,
  ExportLinksUseCaseRequest,
} from '../use-cases/export-links.ts'
import type { FetchLinksUseCaseRequest } from '../use-cases/fetch-links.ts'

export abstract class LinksRepository {
  abstract create(link: Link): Promise<void>

  abstract findById(linkId: UniqueEntityId): Promise<Link | null>
  abstract findMany(filter: FetchLinksUseCaseRequest): Promise<Link[]>
  abstract findByShortUrl(shortUrl: Raw): Promise<Link | null>

  abstract save(linkId: UniqueEntityId, link: Link): Promise<void>

  abstract streamLinks(filter: ExportLinksUseCaseRequest): AsyncIterable<Csv[]>

  abstract delete(linkId: UniqueEntityId): Promise<void>
}
