import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { makeFetchAllCompaniesUseCase } from '@/use-cases/users/factories/make-fetch-all-companies-use-case'
import { makeQueryCompaniesUseCase } from '@/use-cases/users/factories/make-query-companies-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function queryCompanies(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const queryCompaniesQuerySchema = z.object({
    page: z.number().optional(),
    query: z.string().optional(),
  })

  const { page, query } = queryCompaniesQuerySchema.parse(request.query)

  try {
    if (query) {
      const queryCompaniesUseCase = makeQueryCompaniesUseCase()

      const { companies } = await queryCompaniesUseCase.exec({ query, page })

      return reply.status(200).send({ companies })
    }

    const findAllCompaniesUseCase = makeFetchAllCompaniesUseCase()

    const { companies } = await findAllCompaniesUseCase.exec({ page })

    return reply.status(200).send({ companies })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
