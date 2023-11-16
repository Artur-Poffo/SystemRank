import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { QuerySystemsUseCase } from '../query-systems'

export function makeQuerySystemsUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const querySystemsUseCase = new QuerySystemsUseCase(systemsRepository)

  return querySystemsUseCase
}
