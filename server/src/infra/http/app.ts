import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalarUi from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link.ts'
import { deleteLinkRoute } from './routes/delete-link.ts'
import { exportLinksRoute } from './routes/export-links.ts'
import { fetchLinksRoute } from './routes/fetch-links.ts'
import { getLinkByShortUrlRoute } from './routes/get-link-by-short-url.ts'
import { incrementLinkRoute } from './routes/increment-link.ts'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.validation,
    })
  }

  if (isResponseSerializationError(error)) {
    return reply.status(500).send({
      message: 'Validation error.',
      issues: error.validation,
    })
  }

  // Enviar para ferramenta de observabilidade
  console.error(error)

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})

//confiigure o cors para todas as origens e metodos
app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(scalarUi, {
  routePrefix: '/docs',
})

app.get('/openapi.json', async () => {
  return app.swagger()
})

app.register(createLinkRoute)
app.register(deleteLinkRoute)
app.register(incrementLinkRoute)
app.register(getLinkByShortUrlRoute)
app.register(fetchLinksRoute)
app.register(exportLinksRoute)

export default app
