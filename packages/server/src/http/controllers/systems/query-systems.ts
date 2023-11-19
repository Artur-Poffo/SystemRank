import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { makeFetchAllSystemsUseCase } from '@/use-cases/systems/factories/make-fetch-all-systems-use-case'
import { makeQuerySystemsUseCase } from '@/use-cases/systems/factories/make-query-systems-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function querySystems(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySystemsQuerySchema = z.object({
    page: z.number().optional(),
    query: z.string().optional(),
  })

  const { page, query } = querySystemsQuerySchema.parse(request.query)

  try {
    if (query) {
      const querySystemsUseCase = makeQuerySystemsUseCase()

      const { systems } = await querySystemsUseCase.exec({
        query,
        page,
      })

      return reply.status(200).send({ systems })
    }

    const fetchAllSystemsUseCase = makeFetchAllSystemsUseCase()

    const { systems } = await fetchAllSystemsUseCase.exec({ page })

    return reply.status(200).send({ systems })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
