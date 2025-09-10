import { UniqueEntityId } from "@/core/value-objects/unique-entity-id";
import { LinksRepository } from "@/domain/links/application/repositories/links";
import { Link } from "@/domain/links/enterprise/entities/link";
import { Raw } from "@/domain/links/enterprise/value-objects/raw";
import { DrizzleLinksMapper } from "../mappers/links";
import { schema } from "../schemas";
import { eq } from "drizzle-orm";
import { db, pg } from "../../db";
import { PostgresLinksMapper } from "../../postgres/mappers/links";

export class DrizzleLinksRepository implements LinksRepository {
  async create(link: Link): Promise<void> {
    const data = DrizzleLinksMapper.toPersistence(link);
    
    await db.insert(schema.links).values(data);
  }
  async findById(linkId: UniqueEntityId): Promise<Link | null> {
    const link = await db.select()
      .from(schema.links)
      .where(eq(schema.links.id, linkId.toString()))
      .then((result) => result[0]);

    if(!link) {
      return null;
    }

    return DrizzleLinksMapper.toDomain(link);
  }
  async findMany(): Promise<Link[]> {
    const links = await db.select()
      .from(schema.links);

    return links.map(DrizzleLinksMapper.toDomain);
  }
  async findByShortUrl(shortUrl: Raw): Promise<Link | null> {
    const link = await db.select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl.value))
      .then((result) => result[0]);

    if(!link) {
      return null;
    }

    return DrizzleLinksMapper.toDomain(link);
  }
  async save(linkId: UniqueEntityId, link: Link): Promise<void> {
    const data = DrizzleLinksMapper.toPersistence(link);

    await db.update(schema.links)
      .set(data)
      .where(eq(schema.links.id, linkId.toString()));
  }
  async *streamLinks(): AsyncIterable<Link[]> {
    const { sql } = db.select()
      .from(schema.links)
      .toSQL();

    const stream = pg.unsafe(sql).cursor(100);

    for await (const links of stream) {
      yield links.map((link) => PostgresLinksMapper.toDomain(link));
    }
  }

  async delete(linkId: UniqueEntityId): Promise<void> {
    await db.delete(schema.links)
      .where(eq(schema.links.id, linkId.toString()));
  }
  
}