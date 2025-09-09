import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { status } from 'http-status'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create link',
        tags: ['links'],
        response: {
          [status.CREATED]: z.null().describe('Link created successfully'),            
          [status.CONFLICT]: z.object({ message: z.string() })
            .describe('Conflict - Link already exists with same short URL'),
        },
      },
    },
    async (request, reply) => {
      
    }
  )
}
