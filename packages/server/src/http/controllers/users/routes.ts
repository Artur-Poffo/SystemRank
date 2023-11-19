import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { getUserProfile } from './get-user-profile'
import { queryCompanies } from './query-companies'
import { refresh } from './refresh'
import { register } from './register'
import { updateProfile } from './update-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/companies', queryCompanies)
  app.get('/users/:userId', getUserProfile)

  app.patch('/token/refresh', refresh)
  app.patch('/users', { onRequest: [verifyJwt] }, updateProfile)

  app.post('/sessions', authenticate)

  app.post('/users', register)
}
