import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { GetSystemDetailsUseCase } from '../get-system-details'

export function makeGetSystemDetailsUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const getSystemDetailsUseCase = new GetSystemDetailsUseCase(systemsRepository)

  return getSystemDetailsUseCase
}
