import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteReview } from './delete'
import { edit } from './edit'
import { fetchBySystems } from './fetch-by-systems'

export async function reviewsRoutes(app: FastifyInstance) {
  app.get('/reviews/system/:systemId', fetchBySystems)

  app.patch('/reviews/:reviewId', { onRequest: [verifyJwt] }, edit)

  app.delete('/reviews/:reviewId', { onRequest: [verifyJwt] }, deleteReview)

  app.post('/reviews/system/:systemId', { onRequest: [verifyJwt] }, create)
}
