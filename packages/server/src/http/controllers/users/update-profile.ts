import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { makeUpdateUserProfileUseCase } from '@/use-cases/users/factories/make-update-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateUserProfileBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    profileImagePath: z.string().optional(),
    bannerProfileImagePath: z.string().optional(),
  })

  const { name, email, profileImagePath, bannerProfileImagePath } =
    updateUserProfileBodySchema.parse(request.body)

  try {
    const updateUserProfileUseCase = makeUpdateUserProfileUseCase()

    const { user } = await updateUserProfileUseCase.exec({
      name,
      email,
      profileImagePath,
      bannerProfileImagePath,
      userId: request.user.sub,
    })

    return reply.status(200).send({ user })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
