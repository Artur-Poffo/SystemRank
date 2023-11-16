import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchSystemsByCompanyUseCase } from '../fetch-systems-by-company'

export function makeFetchSystemsByCompanyUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const usersRepository = new PrismaUsersRepository()
  const fetchSystemsByCompanyUseCase = new FetchSystemsByCompanyUseCase(
    usersRepository,
    systemsRepository,
  )

  return fetchSystemsByCompanyUseCase
}
