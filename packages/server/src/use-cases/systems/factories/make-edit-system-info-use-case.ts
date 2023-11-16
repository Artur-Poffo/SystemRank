import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { EditSystemInfoUseCase } from '../edit-system-info'

export function makeEditSystemInfoUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const editSystemInfoUseCase = new EditSystemInfoUseCase(systemsRepository)

  return editSystemInfoUseCase
}
