/** biome-ignore-all lint/complexity/noStaticOnlyClass: this is not necessary */
import type postgres from 'postgres'
import type { Csv } from '../../../../domain/links/application/use-cases/export-links.ts'

export class PostgresLinksMapper {
  static toCSV(raw: NonNullable<postgres.Row & Iterable<postgres.Row>>): Csv {
    return {
      id: raw.id,
      original_url: raw.original_url,
      short_url: raw.short_url,
      created_at: raw.created_at,
    }
  }
}
