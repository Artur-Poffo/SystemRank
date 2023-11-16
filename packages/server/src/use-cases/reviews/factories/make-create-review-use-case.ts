import { PrismaReviewsRepository } from '@/repositories/prisma/prisma-reviews-repository'
import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateReviewUseCase } from '../create'

export function makeCreateReviewUseCase() {
  const reviewsRepository = new PrismaReviewsRepository()
  const systemsRepository = new PrismaSystemsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createReviewUseCase = new CreateReviewUseCase(
    systemsRepository,
    usersRepository,
    reviewsRepository,
  )

  return createReviewUseCase
}
