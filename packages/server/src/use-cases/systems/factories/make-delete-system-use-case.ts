import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteSystemUseCase } from '../delete'

export function makeDeleteSystemUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteSystemUseCase = new DeleteSystemUseCase(
    systemsRepository,
    usersRepository,
  )

  return deleteSystemUseCase
}
