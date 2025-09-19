import { desc, eq, ilike } from 'drizzle-orm'
import type { UniqueEntityId } from '../../../../core/value-objects/unique-entity-id'
import type { LinksRepository } from '../../../../domain/links/application/repositories/links'
import type {
  Csv,
  ExportLinksUseCaseRequest,
} from '../../../../domain/links/application/use-cases/export-links.ts'
import type { FetchLinksUseCaseRequest } from '../../../../domain/links/application/use-cases/fetch-links.ts'
import type { Link } from '../../../../domain/links/enterprise/entities/link'
import type { Raw } from '../../../../domain/links/enterprise/value-objects/raw'
import { db, pg } from '../../db.ts'
import { PostgresLinksMapper } from '../../postgres/mappers/links.ts'
import { DrizzleLinksMapper } from '../mappers/links.ts'
import { schema } from '../schemas/index.ts'

export class DrizzleLinksRepository implements LinksRepository {
  async create(link: Link): Promise<Link> {
    const data = DrizzleLinksMapper.toPersistence(link)

    const result = await db.insert(schema.links).values(data).returning()

    return DrizzleLinksMapper.toDomain(result[0])
  }

  async findById(linkId: UniqueEntityId): Promise<Link | null> {
    const link = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, linkId.toString()))
      .then(result => result[0])

    if (!link) {
      return null
    }

    return DrizzleLinksMapper.toDomain(link)
  }

  async findMany({ originalUrl }: FetchLinksUseCaseRequest): Promise<Link[]> {
    const links = await db
      .select()
      .from(schema.links)
      .where(
        originalUrl
          ? ilike(schema.links.originalUrl, `%${originalUrl}%`)
          : undefined
      )
      .orderBy(desc(schema.links.createdAt))

    return links.map(DrizzleLinksMapper.toDomain)
  }

  async findByShortUrl(shortUrl: Raw): Promise<Link | null> {
    const link = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl.value))
      .then(result => result[0])

    if (!link) {
      return null
    }

    return DrizzleLinksMapper.toDomain(link)
  }

  async save(linkId: UniqueEntityId, link: Link): Promise<Link> {
    const data = DrizzleLinksMapper.toPersistence(link)

    const result = await db
      .update(schema.links)
      .set(data)
      .where(eq(schema.links.id, linkId.toString()))
      .returning()

    return DrizzleLinksMapper.toDomain(result[0])
  }
  async *streamLinks({
    originalUrl,
  }: ExportLinksUseCaseRequest): AsyncIterable<Csv[]> {
    const { sql, params } = db
      .select()
      .from(schema.links)
      .where(
        originalUrl
          ? ilike(schema.links.originalUrl, `%${originalUrl}%`)
          : undefined
      )
      .orderBy(desc(schema.links.createdAt))
      .toSQL()

    const stream = pg.unsafe(sql, params as string[]).cursor(50)

    for await (const links of stream) {
      yield links.map(link => PostgresLinksMapper.toCSV(link))
    }
  }

  async delete(linkId: UniqueEntityId): Promise<void> {
    await db.delete(schema.links).where(eq(schema.links.id, linkId.toString()))
  }
}
