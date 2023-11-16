import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { FetchAllUseCase } from '../fetch-all'

export function makeFetchAllSystemsUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const fetchAllSystemsUseCase = new FetchAllUseCase(systemsRepository)

  return fetchAllSystemsUseCase
}
