import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserProfileUseCase } from '../update-profile'

export function makeUpdateUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const updateUserProfileUseCase = new UpdateUserProfileUseCase(usersRepository)

  return updateUserProfileUseCase
}
