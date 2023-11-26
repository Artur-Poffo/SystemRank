import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface FetchAllCompaniesUseCaseRequest {
  page?: number
}

interface FetchAllCompaniesUseCaseResponse {
  companies: User[]
}

export class FetchAllCompaniesUseCase
  implements
    UseCase<FetchAllCompaniesUseCaseRequest, FetchAllCompaniesUseCaseResponse>
{
  constructor(private readonly usersRepository: UserRepository) {}

  async exec({
    page,
  }: FetchAllCompaniesUseCaseRequest): Promise<FetchAllCompaniesUseCaseResponse> {
    const allUsers = await this.usersRepository.findAll(page)

    const companies = allUsers.filter((user) => user.role === 'COMPANY')

    if (!companies) {
      throw new ResourceNotFoundError()
    }

    return { companies }
  }
}
