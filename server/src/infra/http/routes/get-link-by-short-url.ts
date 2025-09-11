import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { status } from 'http-status'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../domain/links/application/use-cases/errors/resource-not-found.ts'
import { makeGetLinkByShortUrl } from '../factories/make-get-link-by-short-url.ts'
import { LinksPresenter, linkPresenterSchema } from '../presenters/links.ts'

export const getLinkByShortUrlRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/links/:short_url/short',
    {
      schema: {
        summary: 'Get link by short url',
        tags: ['links'],
        params: z.object({
          short_url: z.string().describe('The link short url to get'),
        }),
        response: {
          [status.OK]: linkPresenterSchema.describe('Link get successfully'),
          [status.NOT_FOUND]: z
            .object({ message: z.string() })
            .describe('Not Found - Link does not exist'),
        },
      },
    },
    async (request, reply) => {
      const { short_url: shortUrl } = request.params

      const getLinkUseCase = makeGetLinkByShortUrl()

      const result = await getLinkUseCase.execute({ shortUrl })

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
