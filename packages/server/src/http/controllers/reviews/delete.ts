import { makeDeleteReviewUseCase } from '@/use-cases/reviews/factories/make-delete-review-use-case'
import { PermissionDeniedError } from '@/use-cases/shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteReview(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteReviewParamsSchema = z.object({
    reviewId: z.string(),
  })

  const { reviewId } = deleteReviewParamsSchema.parse(request.params)

  try {
    const deleteReviewUseCase = makeDeleteReviewUseCase()

    const { review } = await deleteReviewUseCase.exec({
      reviewId,
      userId: request.user.sub,
    })

    return reply.status(200).send({ review })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof PermissionDeniedError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
