import { db } from '../src/infra/database/db.ts'
import app from '../src/infra/http/app.ts'

beforeAll(async () => {
  await app.ready()
  // Clean database before running tests
  await db.execute('TRUNCATE TABLE links RESTART IDENTITY CASCADE')
})

beforeEach(async () => {
  // Clean database before each test
  await db.execute('TRUNCATE TABLE links RESTART IDENTITY CASCADE')
})

afterEach(async () => {
  // Clean database after each test to prevent interference
  await db.execute('TRUNCATE TABLE links RESTART IDENTITY CASCADE')
})

afterAll(async () => {
  await db.execute('TRUNCATE TABLE links RESTART IDENTITY CASCADE')
  await app.close()
})
