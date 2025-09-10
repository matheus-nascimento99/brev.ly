import type { Config } from 'drizzle-kit'
import { env } from './src/infra/env'

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: 'src/infra/database/drizzle/schemas/*',
  out: 'src/infra/database/drizzle/migrations',
} satisfies Config
