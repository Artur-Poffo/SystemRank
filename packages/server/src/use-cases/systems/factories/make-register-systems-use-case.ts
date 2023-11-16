import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterSystemUseCase } from '../register'

export function makeRegisterSystemsUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const usersRepository = new PrismaUsersRepository()
  const registerSystemUseCase = new RegisterSystemUseCase(
    systemsRepository,
    usersRepository,
  )

  return registerSystemUseCase
}
