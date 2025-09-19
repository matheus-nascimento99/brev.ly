import status from 'http-status'
import request from 'supertest'
import { makeDrizzleLink } from '../../database/drizzle/factory/make-link.ts'
import app from '../app.ts'

describe('Get Link by short url (e2e)', () => {
  test('/links/:short_url/short (GET)', async () => {
    const link = await makeDrizzleLink({})

    const result = await request(app.server)
      .get(`/links/${link.shortUrl.value}/short`)
      .expect(status.OK)

    expect(result.body.link).toMatchObject({
      id: link.id.toString(),
      original_url: link.originalUrl,
      short_url: link.shortUrl.value,
      access_count: link.accessCount,
      created_at: link.createdAt.toISOString(),
    })
  })
})
