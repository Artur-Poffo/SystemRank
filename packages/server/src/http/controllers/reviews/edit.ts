import { makeEditReviewUseCase } from '@/use-cases/reviews/factories/make-edit-review-use-case'
import { PermissionDeniedError } from '@/use-cases/shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editReviewBodySchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    rating: z.number().optional(),
  })

  const editReviewParamsSchema = z.object({
    reviewId: z.string(),
  })

  const { title, content, rating } = editReviewBodySchema.parse(request.body)
  const { reviewId } = editReviewParamsSchema.parse(request.params)

  try {
    const editReviewUseCase = makeEditReviewUseCase()

    const { review } = await editReviewUseCase.exec({
      title,
      content,
      rating,
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
