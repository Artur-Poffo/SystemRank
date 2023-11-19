import { PermissionDeniedError } from '@/use-cases/shared/errors/permission-denied-error'
import { SystemAlreadyExistsError } from '@/use-cases/systems/errors/system-already-exists-error'
import { makeRegisterSystemsUseCase } from '@/use-cases/systems/factories/make-register-systems-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSystemBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    content: z.string(),
    systemPageLink: z.string().optional(),
    systemLogoImagePath: z.string().optional(),
    systemCoverImagePath: z.string().optional(),
  })

  const {
    name,
    description,
    content,
    systemPageLink,
    systemLogoImagePath,
    systemCoverImagePath,
  } = registerSystemBodySchema.parse(request.body)

  try {
    const registerSystemUseCase = makeRegisterSystemsUseCase()

    await registerSystemUseCase.exec({
      name,
      description,
      content,
      systemPageLink,
      systemLogoImagePath,
      systemCoverImagePath,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof SystemAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof PermissionDeniedError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
