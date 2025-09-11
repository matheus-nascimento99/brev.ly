import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { status } from 'http-status'
import { z } from 'zod'
import { makeFetchLinks } from '../factories/make-fetch-links.ts'
import { LinksPresenter, linkPresenterSchema } from '../presenters/links.ts'

export const fetchLinksRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/links',
    {
      schema: {
        summary: 'Fetch links',
        tags: ['links'],
        querystring: z.object({
          originalUrl: z
            .string()
            .trim()
            .toLowerCase()
            .min(1)
            .optional()
            .describe('The original URL to filter links'),
        }),
        response: {
          [status.OK]: z.object({
            links: z
              .array(linkPresenterSchema)
              .describe('Links fetched successfully'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl } = request.query

      const fetchLinksUseCase = makeFetchLinks()

      const result = await fetchLinksUseCase.execute({ originalUrl })

      return reply
        .status(status.OK)
        .send({ links: result.value.links.map(LinksPresenter.toHTTP) })
    }
  )
}
