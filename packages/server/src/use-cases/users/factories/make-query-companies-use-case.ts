import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { QueryCompaniesUseCase } from '../query-companies'

export function makeQueryCompaniesUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const queryCompaniesUseCase = new QueryCompaniesUseCase(usersRepository)

  return queryCompaniesUseCase
}
