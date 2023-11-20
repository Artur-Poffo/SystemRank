import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteReview } from './delete'
import { edit } from './edit'
import { fetchBySystem } from './fetch-by-system'
import { fetchByUser } from './fetch-by-user'

export async function reviewsRoutes(app: FastifyInstance) {
  app.get('/reviews/system/:systemId', fetchBySystem)
  app.get('/reviews/user/:userId', fetchByUser)

  app.patch('/reviews/:reviewId', { onRequest: [verifyJwt] }, edit)

  app.delete('/reviews/:reviewId', { onRequest: [verifyJwt] }, deleteReview)

  app.post('/reviews/system/:systemId', { onRequest: [verifyJwt] }, create)
}
