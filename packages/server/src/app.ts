import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyFormbody from '@fastify/formbody'
import fastifyJwt from '@fastify/jwt'
import { env } from 'env'
import fastify from 'fastify'
import { readFileSync } from 'fs'
import { ZodError } from 'zod'
import { reviewsRoutes } from './http/controllers/reviews/routes'
import { systemsRoutes } from './http/controllers/systems/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

// Plugins

app.register(fastifyCors, {
  origin: [env.CLIENT_URL],
  credentials: true
})

app.register(fastifyFormbody)

app.register(fastifyJwt, {
  secret: {
    private: readFileSync('./private-key.pem'),
    public: readFileSync('./public-key.pem'),
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: { algorithm: 'RS256', expiresIn: '10m' },
})

app.register(fastifyCookie)

// API Routes

app.get('/', (_, reply) => reply.send('Welcome to SystemRank API!'))

app.register(usersRoutes)
app.register(systemsRoutes)
app.register(reviewsRoutes)

// Custom error handler

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
