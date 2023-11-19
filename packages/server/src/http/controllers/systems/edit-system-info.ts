import { PermissionDeniedError } from '@/use-cases/shared/errors/permission-denied-error'
import { SystemAlreadyExistsError } from '@/use-cases/systems/errors/system-already-exists-error'
import { makeEditSystemInfoUseCase } from '@/use-cases/systems/factories/make-edit-system-info-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editSystemInfo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editSystemInfoBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    systemPageLink: z.string().optional(),
    systemLogoImagePath: z.string().optional(),
    systemCoverImagePath: z.string().optional(),
  })

  const editSystemInfoParamsSchema = z.object({
    systemId: z.string(),
  })

  const {
    name,
    description,
    content,
    systemPageLink,
    systemLogoImagePath,
    systemCoverImagePath,
  } = editSystemInfoBodySchema.parse(request.body)

  const { systemId } = editSystemInfoParamsSchema.parse(request.params)

  try {
    const editSystemInfoUseCase = makeEditSystemInfoUseCase()

    const { system } = await editSystemInfoUseCase.exec({
      name,
      description,
      content,
      systemPageLink,
      systemLogoImagePath,
      systemCoverImagePath,
      userId: request.user.sub,
      systemId,
    })

    return reply.status(200).send({ system })
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
