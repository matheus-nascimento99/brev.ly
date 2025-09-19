import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { status } from 'http-status'
import { z } from 'zod'
import { LinkWithShortUrlAlreadyExistsError } from '../../../domain/links/application/use-cases/errors/link-with-short-url-already-exists.ts'
import { makeCreateLink } from '../factories/make-create-link.ts'
import { LinksPresenter, linkPresenterSchema } from '../presenters/links.ts'

export const createLinkRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/links',
    {
      schema: {
        summary: 'Create link',
        tags: ['links'],
        body: z.object({
          originalUrl: z.url().describe('The original URL to be shortened'),
          shortUrl: z
            .string()
            .min(1, { message: 'Informe um alias para o link.' })
            .describe('The desired short URL (alias)'),
        }),
        response: {
          [status.OK]: linkPresenterSchema.describe(
            'Link created successfully'
          ),
          [status.CONFLICT]: z
            .object({ message: z.string() })
            .describe('Conflict - Link already exists with same short URL'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const createLinkUseCase = makeCreateLink()

      const result = await createLinkUseCase.execute({ originalUrl, shortUrl })

      if (result.isRight()) {
        return reply
          .status(status.OK)
          .send(LinksPresenter.toHTTP(result.value.link))
      }

      const error = result.value

      switch (error.constructor) {
        case LinkWithShortUrlAlreadyExistsError:
          return reply.status(status.CONFLICT).send({ message: error.message })
      }
    }
  )
}
