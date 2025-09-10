import { Link } from "@/domain/links/enterprise/entities/link";
import { InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { schema } from "../schemas";
import { Raw } from "@/domain/links/enterprise/value-objects/raw";
import { UniqueEntityId } from "@/core/value-objects/unique-entity-id";

export class DrizzleLinksMapper {
  static toDomain(raw: InferSelectModel<typeof schema.links>): Link {
    return Link.create({
      originalUrl: raw.originalUrl,
      shortUrl: Raw.create(raw.shortUrl),
      accessCount: raw.accessCount,
      createdAt: raw.createdAt,
    }, new UniqueEntityId(raw.id));
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