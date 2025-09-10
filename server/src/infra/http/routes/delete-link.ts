import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { status } from 'http-status'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../domain/links/application/use-cases/errors/resource-not-found.ts'
import { makeDeleteLink } from '../factories/make-delete-link.ts'

export const deleteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/links/:link_id',
    {
      schema: {
        summary: 'Delete link',
        tags: ['links'],
        params: z.object({
          link_id: z.uuid().describe('The ID of the link to be deleted'),
        }),
        response: {
          [status.NO_CONTENT]: z.null().describe('Link deleted successfully'),
          [status.NOT_FOUND]: z
            .object({ message: z.string() })
            .describe('Not Found - Link does not exist'),
        },
      },
    },
    async (request, reply) => {
      const { link_id: linkId } = request.params

      const deleteLinkUseCase = makeDeleteLink()

      const result = await deleteLinkUseCase.execute({ linkId })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case ResourceNotFoundError:
            return reply
              .status(status.NOT_FOUND)
              .send({ message: error.message })
        }
      }

      return reply.status(status.NO_CONTENT).send()
    }
  )
}
