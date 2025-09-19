import z from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  API_URL: z.url(),
})

export const env = envSchema.parse(process.env)
