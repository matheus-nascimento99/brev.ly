import { makeLink } from '../../../../../test/factories/make-link'
import type { LinkProps } from '../../../../domain/links/enterprise/entities/link'
import { db } from '../../db'
import { DrizzleLinksMapper } from '../mappers/links'
import { schema } from '../schemas'

export const makeDrizzleLink = async (params: Partial<LinkProps> = {}) => {
  const link = makeLink(params)
  const data = DrizzleLinksMapper.toPersistence(link)

  await db.insert(schema.links).values(data)

  return link
}
