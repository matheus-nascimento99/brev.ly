import status from 'http-status'
import request from 'supertest'
import { db } from '../../database/db.ts'
import { schema } from '../../database/drizzle/schemas/index.ts'
import app from '../app.ts'

describe('Create Link (e2e)', () => {
  test('/links (POST)', async () => {
    const result = await request(app.server)
      .post('/links')
      .send({
        originalUrl: 'https://example.com',
        shortUrl: 'test-link',
      })
      .expect(status.OK)

    expect(result.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )

    const links = await db.select().from(schema.links)

    expect(links).toHaveLength(1)
    expect(links[0]).toMatchObject({
      originalUrl: 'https://example.com',
      shortUrl: 'test-link',
    })
  })
})
