/** biome-ignore-all lint/complexity/noStaticOnlyClass: this is not necessary */

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { UniqueEntityId } from '../../../../core/value-objects/unique-entity-id.ts'
import { Link } from '../../../../domain/links/enterprise/entities/link.ts'
import { Raw } from '../../../../domain/links/enterprise/value-objects/raw.ts'
import type { schema } from '../schemas/index.ts'

export class DrizzleLinksMapper {
  static toDomain(raw: InferSelectModel<typeof schema.links>): Link {
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

  static toPersistence(link: Link): InferInsertModel<typeof schema.links> {
    return {
      id: link.id.toString(),
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl.value,
      accessCount: link.accessCount,
      createdAt: link.createdAt,
    }
  }
}
