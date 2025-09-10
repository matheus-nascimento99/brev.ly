import { Link } from "@/domain/links/enterprise/entities/link";
import { Raw } from "@/domain/links/enterprise/value-objects/raw";
import { UniqueEntityId } from "@/core/value-objects/unique-entity-id";
import postgres from "postgres";

export class PostgresLinksMapper {
  static toDomain(raw: NonNullable<postgres.Row & Iterable<postgres.Row>>): Link {
    return Link.create({
      originalUrl: raw.originalUrl,
      shortUrl: Raw.create(raw.shortUrl),
      accessCount: raw.accessCount,
      createdAt: raw.createdAt,
    }, new UniqueEntityId(raw.id));
  }
}