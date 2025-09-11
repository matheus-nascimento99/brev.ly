import { eq } from 'drizzle-orm'
import status from 'http-status'
import request from 'supertest'
import { db } from '../../database/db.ts'
import { makeDrizzleLink } from '../../database/drizzle/factory/make-link.ts'
import { schema } from '../../database/drizzle/schemas/index.ts'
import app from '../app.ts'

describe('Increment Link (e2e)', () => {
  test('/links (PATCH)', async () => {
    const link = await makeDrizzleLink({})

    await request(app.server)
      .patch(`/links/${link.id}`)
      .expect(status.NO_CONTENT)

    const links = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, link.id.toString()))

    expect(links).toHaveLength(1)
    expect(links[0]).toMatchObject({
      accessCount: 1,
    })
  })
})
