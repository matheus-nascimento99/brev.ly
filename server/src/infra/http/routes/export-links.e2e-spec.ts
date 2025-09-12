import { faker } from '@faker-js/faker'
import status from 'http-status'
import request from 'supertest'
import { makeDrizzleLink } from '../../database/drizzle/factory/make-link.ts'
import app from '../app.ts'

describe('Export links (e2e)', () => {
  test('/links/exports (POST)', async () => {
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
      .post(`/links/exports?originalUrl=${uuid}`)
      .expect(status.OK)

    console.log(result.body)

    expect(result.body.report_url).toEqual(expect.any(String))
  })
})
