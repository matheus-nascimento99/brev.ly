import { db } from '../src/infra/database/db.ts'
import { schema } from '../src/infra/database/drizzle/schemas/index.ts'
import app from '../src/infra/http/app.ts'

beforeAll(async () => {
  console.log('Starting server for e2e tests...')
  console.log(`DB URL: ${process.env.DATABASE_URL}`)

  await app.ready()
  await db.delete(schema.links)
})

afterAll(async () => {
  console.log('Stopping server after e2e tests...')

  await app.close()
})
