import status from 'http-status'
import request from 'supertest'
import { db } from '../../database/db.ts'
import { makeDrizzleLink } from '../../database/drizzle/factory/make-link.ts'
import { schema } from '../../database/drizzle/schemas/index.ts'
import app from '../app.ts'

describe('Delete Link (e2e)', () => {
  test('/links (DELETE)', async () => {
    const link = await makeDrizzleLink({})

    await request(app.server)
      .delete(`/links/${link.id}`)
      .expect(status.NO_CONTENT)

    const links = await db.select().from(schema.links)

    expect(links).toHaveLength(0)
  })
})
