import type { UniqueEntityId } from '../../src/core/value-objects/unique-entity-id.ts'
import type { LinksRepository } from '../../src/domain/links/application/repositories/links.ts'
import type {
  Csv,
  ExportLinksUseCaseRequest,
} from '../../src/domain/links/application/use-cases/export-links.ts'
import type { FetchLinksUseCaseRequest } from '../../src/domain/links/application/use-cases/fetch-links.ts'
import type { Link } from '../../src/domain/links/enterprise/entities/link.ts'
import type { Raw } from '../../src/domain/links/enterprise/value-objects/raw.ts'

export class InMemoryLinksRepository implements LinksRepository {
  public items: Map<string, Link> = new Map()

  async create(link: Link): Promise<Link> {
    this.items.set(link.id.toString(), link)

    return link
  }

  async findById(linkId: UniqueEntityId): Promise<Link | null> {
    const link = this.items.get(linkId.toString())

    if (!link) {
      return null
    }

    return link
  }

  async findMany({ originalUrl }: FetchLinksUseCaseRequest): Promise<Link[]> {
    const links = Array.from(this.items.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )

    if (originalUrl) {
      return links.filter(link => link.originalUrl.includes(originalUrl))
    }

    return links
  }

  async findByShortUrl(shortUrl: Raw): Promise<Link | null> {
    const link = Array.from(this.items.values()).find(link =>
      link.shortUrl.equals(shortUrl)
    )

    if (!link) {
      return null
    }

    return link
  }

  async save(linkId: UniqueEntityId, link: Link): Promise<Link> {
    this.items.set(linkId.toString(), link)

    return link
  }

  async delete(linkId: UniqueEntityId): Promise<void> {
    this.items.delete(linkId.toString())
  }

  async *streamLinks({
    originalUrl,
  }: ExportLinksUseCaseRequest): AsyncIterable<Csv[]> {
    yield Array.from(this.items.values())
      .filter(link => {
        if (originalUrl) {
          return link.originalUrl.includes(originalUrl)
        }
        return true
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(item => ({
        id: item.id.toString(),
        original_url: item.originalUrl,
        short_url: item.shortUrl.value,
        created_at: item.createdAt.toISOString(),
      }))
  }
}
