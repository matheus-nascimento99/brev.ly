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
import { env } from '../env.ts'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _, reply) => {
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

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(scalarUi, {
  routePrefix: '/docs',
})

server.get('/openapi.json', async () => {
  return server.swagger()
})

server.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
  console.log('HTTP Server running!')
})
