import { db } from '../src/infra/database/db.ts'
import app from '../src/infra/http/app.ts'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await db.execute('TRUNCATE TABLE links RESTART IDENTITY CASCADE')
  await app.close()
})
