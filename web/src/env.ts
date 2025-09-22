import z from 'zod'

export const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production']).default('production'),
  VITE_API_URL: z.url(),
})

export const env = envSchema.parse(import.meta.env)
