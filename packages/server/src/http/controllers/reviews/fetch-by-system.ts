import { makeFetchReviewsBySystemUseCase } from '@/use-cases/reviews/factories/make-fetch-reviews-by-system-use-case'
import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchBySystem(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchReviewsBySystemQuerySchema = z.object({
    page: z.number().optional(),
  })

  const fetchReviewsBySystemParamsSchema = z.object({
    systemId: z.string(),
  })

  const { page } = fetchReviewsBySystemQuerySchema.parse(request.query)
  const { systemId } = fetchReviewsBySystemParamsSchema.parse(request.params)

  try {
    const fetchReviewsBySystemUseCase = makeFetchReviewsBySystemUseCase()

    const { reviews } = await fetchReviewsBySystemUseCase.exec({
      systemId,
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
