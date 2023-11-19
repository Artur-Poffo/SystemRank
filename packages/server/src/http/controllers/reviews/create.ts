import { ReviewAlreadyExistsError } from '@/use-cases/reviews/errors/review-already-exists-error'
import { TheSystemOwnerCannotMakeReviewsError } from '@/use-cases/reviews/errors/the-system-owner-cannot-make-reviews-error'
import { makeCreateReviewUseCase } from '@/use-cases/reviews/factories/make-create-review-use-case'
import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createReviewBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    rating: z.number(),
  })

  const createReviewParamsSchema = z.object({
    systemId: z.string(),
  })

  const { title, content, rating } = createReviewBodySchema.parse(request.body)
  const { systemId } = createReviewParamsSchema.parse(request.params)

  try {
    const createReviewUseCase = makeCreateReviewUseCase()

    await createReviewUseCase.exec({
      title,
      content,
      rating,
      systemId,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof TheSystemOwnerCannotMakeReviewsError) {
      return reply.status(401).send({ message: err.message })
    }

    if (err instanceof ReviewAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
