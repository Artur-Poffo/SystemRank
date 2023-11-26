import { SystemsRepository } from '@/repositories/systems-repository'
import { System } from '@prisma/client'
import { UseCase } from '../shared/interfaces/UseCase'

interface FetchAllUseCaseRequest {
  page?: number
}

interface FetchAllUseCaseResponse {
  systems: System[]
}

export class FetchAllUseCase
  implements UseCase<FetchAllUseCaseRequest, FetchAllUseCaseResponse>
{
  constructor(private readonly systemsRepository: SystemsRepository) {}

  async exec({
    page,
  }: FetchAllUseCaseRequest): Promise<FetchAllUseCaseResponse> {
    const systems = await this.systemsRepository.findAll(page)
    return { systems }
  }
}
