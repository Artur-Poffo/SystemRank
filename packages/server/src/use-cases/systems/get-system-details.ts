import { SystemsRepository } from '@/repositories/systems-repository'
import { System } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface GetSystemDetailsUseCaseRequest {
  systemId: string
}

interface GetSystemDetailsUseCaseResponse {
  system: System
}

export class GetSystemDetailsUseCase
  implements
    UseCase<GetSystemDetailsUseCaseRequest, GetSystemDetailsUseCaseResponse>
{
  constructor(private readonly systemsRepository: SystemsRepository) {}

  async exec({
    systemId,
  }: GetSystemDetailsUseCaseRequest): Promise<GetSystemDetailsUseCaseResponse> {
    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundError()
    }

    return { system }
  }
}
