import type { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import { Link, type LinkProps } from '@/domain/links/enterprise/entities/link'
import { Raw } from '@/domain/links/enterprise/value-objects/raw'
import { faker } from '@faker-js/faker'

export const makeLink = (
  override: Partial<LinkProps> = {},
  id?: UniqueEntityId
) => {
  return Link.create(
    {
      originalUrl: faker.internet.url(),
      shortUrl: Raw.createFromText(faker.string.uuid()),
      ...override,
    },
    id
  )
}
