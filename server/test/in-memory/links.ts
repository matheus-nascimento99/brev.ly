import type { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import type { LinksRepository } from '@/domain/links/application/repositories/links'
import type { Link } from '@/domain/links/enterprise/entities/link'
import type { Raw } from '@/domain/links/enterprise/value-objects/raw'

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

  async findMany(): Promise<Link[]> {
    return Array.from(this.items.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
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
}
