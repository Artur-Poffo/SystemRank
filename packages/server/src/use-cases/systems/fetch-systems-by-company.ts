import { SystemsRepository } from '@/repositories/systems-repository'
import { UserRepository } from '@/repositories/users-repository'
import { System } from '@prisma/client'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface FetchSystemsByCompanyUseCaseRequest {
  companyId: string
  page?: number
}

interface FetchSystemsByCompanyUseCaseResponse {
  systems: System[]
}

export class FetchSystemsByCompanyUseCase
  implements
    UseCase<
      FetchSystemsByCompanyUseCaseRequest,
      FetchSystemsByCompanyUseCaseResponse
    >
{
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly systemsRepository: SystemsRepository,
  ) {}

  async exec({
    companyId,
    page,
  }: FetchSystemsByCompanyUseCaseRequest): Promise<FetchSystemsByCompanyUseCaseResponse> {
    const company = await this.usersRepository.findById(companyId)

    if (!company) {
      throw new ResourceNotFoundError()
    }

    if (company.role !== 'COMPANY') {
      throw new PermissionDeniedError()
    }

    const systems = await this.systemsRepository.findManyByCompanyId(
      companyId,
      page,
    )

    return { systems }
  }
}
