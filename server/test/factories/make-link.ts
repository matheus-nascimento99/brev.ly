import { faker } from '@faker-js/faker'
import type { UniqueEntityId } from '../../src/core/value-objects/unique-entity-id.ts'
import {
  Link,
  type LinkProps,
} from '../../src/domain/links/enterprise/entities/link'
import { Raw } from '../../src/domain/links/enterprise/value-objects/raw.ts'

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
