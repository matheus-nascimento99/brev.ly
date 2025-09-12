import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import status from 'http-status'
import { z } from 'zod/v4'
import { makeExportLinks } from '../factories/make-export-links'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links/exports',
    {
      schema: {
        summary: 'Export links',
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
            report_url: z.url(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl } = request.query

      const exportLinksUseCase = makeExportLinks()

      const result = await exportLinksUseCase.execute({ originalUrl })

      return reply.status(status.OK).send({ report_url: result.value.reportUrl })
    }
  )
}
