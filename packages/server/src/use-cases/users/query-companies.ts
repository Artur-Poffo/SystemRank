import { UserRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface QueryCompaniesUseCaseRequest {
  query: string
  page?: number
}

interface QueryCompaniesUseCaseResponse {
  companies: User[]
}

export class QueryCompaniesUseCase
  implements
    UseCase<QueryCompaniesUseCaseRequest, QueryCompaniesUseCaseResponse>
{
  constructor(private readonly usersRepository: UserRepository) {}

  async exec({
    query,
    page,
  }: QueryCompaniesUseCaseRequest): Promise<QueryCompaniesUseCaseResponse> {
    const companies = await this.usersRepository.findManyByQueryName(
      query,
      page,
    )

    if (!companies) {
      throw new ResourceNotFoundError()
    }

    return { companies }
  }
}
