import { makeFetchReviewsByUserUseCase } from '@/use-cases/reviews/factories/make-fetch-reviews-by-user-use-case'
import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchReviewsByUserQuerySchema = z.object({
    page: z.number().optional(),
  })

  const fetchReviewsByUserParamsSchema = z.object({
    userId: z.string(),
  })

  const { page } = fetchReviewsByUserQuerySchema.parse(request.query)
  const { userId } = fetchReviewsByUserParamsSchema.parse(request.params)

  try {
    const fetchReviewsByUserUseCase = makeFetchReviewsByUserUseCase()

    const { reviews } = await fetchReviewsByUserUseCase.exec({
      userId,
      page,
    })

    return reply.status(200).send({ reviews })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
