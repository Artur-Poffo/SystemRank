import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/users/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = getUserProfileParamsSchema.parse(request.params)

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getUserProfileUseCase.exec({ userId })

    return reply.status(200).send({ user })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
