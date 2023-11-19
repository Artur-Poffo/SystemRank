import { ResourceNotFoundError } from '@/use-cases/shared/errors/resource-not-found-error'
import { makeFetchSystemsByCompanyUseCase } from '@/use-cases/systems/factories/make-fetch-systems-by-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchSystemsByCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchSystemsByCompanyQuerySchema = z.object({
    page: z.number().optional(),
  })

  const fetchSystemsByCompanyParamsSchema = z.object({
    companyId: z.string(),
  })

  const { page } = fetchSystemsByCompanyQuerySchema.parse(request.query)
  const { companyId } = fetchSystemsByCompanyParamsSchema.parse(request.params)

  try {
    const fetchSystemsByCompanyUseCase = makeFetchSystemsByCompanyUseCase()

    const { systems } = await fetchSystemsByCompanyUseCase.exec({
      companyId,
      page,
    })

    return reply.status(200).send({ systems })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
