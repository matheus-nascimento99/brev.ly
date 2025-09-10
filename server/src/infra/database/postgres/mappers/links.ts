/** biome-ignore-all lint/complexity/noStaticOnlyClass: this is not necessary */
import type postgres from 'postgres'
import { UniqueEntityId } from '../../../../core/value-objects/unique-entity-id.ts'
import { Link } from '../../../../domain/links/enterprise/entities/link.ts'
import { Raw } from '../../../../domain/links/enterprise/value-objects/raw.ts'

export class PostgresLinksMapper {
  static toDomain(
    raw: NonNullable<postgres.Row & Iterable<postgres.Row>>
  ): Link {
    return Link.create(
      {
        originalUrl: raw.originalUrl,
        shortUrl: Raw.create(raw.shortUrl),
        accessCount: raw.accessCount,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id)
    )
  }
}
