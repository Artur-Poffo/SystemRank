import { SystemsRepository } from '@/repositories/systems-repository'
import { System } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface QuerySystemsUseCaseRequest {
  query: string
  page?: number
}

interface QuerySystemsUseCaseResponse {
  systems: System[]
}

export class QuerySystemsUseCase
  implements UseCase<QuerySystemsUseCaseRequest, QuerySystemsUseCaseResponse>
{
  constructor(private readonly systemsRepository: SystemsRepository) {}

  async exec({
    query,
    page = 1,
  }: QuerySystemsUseCaseRequest): Promise<QuerySystemsUseCaseResponse> {
    const systems = await this.systemsRepository.findManyByQueryName(
      query,
      page,
    )

    if (!systems) {
      throw new ResourceNotFoundError()
    }

    return { systems }
  }
}
