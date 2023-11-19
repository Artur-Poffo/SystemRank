import { PermissionDeniedError } from '@/use-cases/shared/errors/permission-denied-error'
import { SystemAlreadyExistsError } from '@/use-cases/systems/errors/system-already-exists-error'
import { makeDeleteSystemUseCase } from '@/use-cases/systems/factories/make-delete-system-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteSystem(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteSystemParamsSchema = z.object({
    systemId: z.string(),
  })

  const { systemId } = deleteSystemParamsSchema.parse(request.params)

  try {
    const deleteSystemUseCase = makeDeleteSystemUseCase()

    const { system } = await deleteSystemUseCase.exec({
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
