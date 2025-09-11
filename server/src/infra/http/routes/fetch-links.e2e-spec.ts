import { faker } from '@faker-js/faker'
import status from 'http-status'
import request from 'supertest'
import { makeDrizzleLink } from '../../database/drizzle/factory/make-link.ts'
import app from '../app.ts'

describe('Fetch links (e2e)', () => {
  test('/links (GET)', async () => {
    const uuid = faker.string.uuid()
    const uniqueOriginalUrl = `https://example.com/${uuid}`

    await Promise.all([
      makeDrizzleLink({
        createdAt: new Date(2024, 1, 1),
        originalUrl: uniqueOriginalUrl,
      }),
      makeDrizzleLink({
        createdAt: new Date(2024, 1, 2),
        originalUrl: uniqueOriginalUrl,
      }),
      makeDrizzleLink({
        createdAt: new Date(2024, 1, 3),
        originalUrl: uniqueOriginalUrl,
      }),
      makeDrizzleLink({
        createdAt: new Date(2024, 1, 4),
        originalUrl: uniqueOriginalUrl,
      }),
      makeDrizzleLink({ createdAt: new Date(2024, 1, 5) }),
      makeDrizzleLink({ createdAt: new Date(2024, 1, 6) }),
      makeDrizzleLink({ createdAt: new Date(2024, 1, 7) }),
    ])

    const result = await request(app.server)
      .get(`/links?originalUrl=${uuid}`)
      .expect(status.OK)

    expect(result.body.links).toHaveLength(4)
    expect(result.body.links).toEqual([
      expect.objectContaining({
        created_at: new Date(2024, 1, 4).toISOString(),
      }),
      expect.objectContaining({
        created_at: new Date(2024, 1, 3).toISOString(),
      }),
      expect.objectContaining({
        created_at: new Date(2024, 1, 2).toISOString(),
      }),
      expect.objectContaining({
        created_at: new Date(2024, 1, 1).toISOString(),
      }),
    ])
  })
})
