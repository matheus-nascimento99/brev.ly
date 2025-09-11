import type { UniqueEntityId } from '../../src/core/value-objects/unique-entity-id.ts'
import type { LinksRepository } from '../../src/domain/links/application/repositories/links.ts'
import type { FetchLinksUseCaseRequest } from '../../src/domain/links/application/use-cases/fetch-links.ts'
import type { Link } from '../../src/domain/links/enterprise/entities/link.ts'
import type { Raw } from '../../src/domain/links/enterprise/value-objects/raw.ts'

export class InMemoryLinksRepository implements LinksRepository {
  public items: Map<string, Link> = new Map()

  async create(link: Link): Promise<void> {
    this.items.set(link.id.toString(), link)
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

  async save(linkId: UniqueEntityId, link: Link): Promise<void> {
    this.items.set(linkId.toString(), link)
  }

  async delete(linkId: UniqueEntityId): Promise<void> {
    this.items.delete(linkId.toString())
  }

  async *streamLinks(): AsyncIterable<Link[]> {
    yield Array.from(this.items.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
  }
}
