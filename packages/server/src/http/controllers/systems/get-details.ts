import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { makeGetSystemDetailsUseCase } from '@/use-cases/systems/factories/make-get-system-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const getSystemDetailsParamsSchema = z.object({
    systemId: z.string().uuid(),
  })

  const { systemId } = await getSystemDetailsParamsSchema.parse(request.params)

  try {
    const getSystemDetailsUseCase = makeGetSystemDetailsUseCase()

    const { system } = await getSystemDetailsUseCase.exec({
      systemId,
    })

    return reply.status(200).send({ system })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
