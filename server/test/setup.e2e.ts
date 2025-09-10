import { db } from '../src/infra/database/db.ts'
import app from '../src/infra/http/app.ts'

beforeAll(async () => {
  await app.ready()
})

beforeEach(async () => {
  await db.execute('TRUNCATE TABLE links RESTART IDENTITY CASCADE')
})

afterAll(async () => {
  await app.close()
})
