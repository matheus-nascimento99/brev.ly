import { db } from '../src/infra/database/db.ts'
import { schema } from '../src/infra/database/drizzle/schemas/index.ts'
import app from '../src/infra/http/app.ts'

beforeAll(async () => {
  await app.ready()
  await db.delete(schema.links)
})

afterAll(async () => {
  await app.close()
})
