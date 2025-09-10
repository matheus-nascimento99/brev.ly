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

app.register(fastifyCors, { origin: '*' })

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

export default app
