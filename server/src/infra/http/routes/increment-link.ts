import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { status } from 'http-status'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../domain/links/application/use-cases/errors/resource-not-found.ts'
import { makeIncrementLink } from '../factories/make-increment-link.ts'
import { LinksPresenter, linkPresenterSchema } from '../presenters/links.ts'

export const incrementLinkRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/links/:link_id/increments',
    {
      schema: {
        summary: 'Increment link',
        tags: ['links'],
        params: z.object({
          link_id: z.uuid().describe('The ID of the link to be incrementd'),
        }),
        response: {
          [status.OK]: linkPresenterSchema.describe(
            'Link incrementd successfully'
          ),
          [status.NOT_FOUND]: z
            .object({ message: z.string() })
            .describe('Not Found - Link does not exist'),
        },
      },
    },
    async (request, reply) => {
      const { link_id: linkId } = request.params

      const incrementLinkUseCase = makeIncrementLink()

      const result = await incrementLinkUseCase.execute({ linkId })

      if (result.isRight()) {
        return reply
          .status(status.OK)
          .send(LinksPresenter.toHTTP(result.value.link))
      }

      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          return reply.status(status.NOT_FOUND).send({ message: error.message })
      }
    }
  )
}
