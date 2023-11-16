import { FastifyInstance } from 'fastify'
import { getUserProfile } from './get-user-profile'
import { register } from './register'

export async function organizationsRoutes(app: FastifyInstance) {
  app.get('/users/:id', getUserProfile)
  app.post('/users', register)
}
