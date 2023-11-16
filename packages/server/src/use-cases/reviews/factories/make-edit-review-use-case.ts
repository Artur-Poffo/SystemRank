import { PrismaReviewsRepository } from '@/repositories/prisma/prisma-reviews-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EditReviewUseCase } from '../edit'

export function makeEditReviewUseCase() {
  const reviewsRepository = new PrismaReviewsRepository()
  const usersRepository = new PrismaUsersRepository()
  const editReviewUseCase = new EditReviewUseCase(
    usersRepository,
    reviewsRepository,
  )

  return editReviewUseCase
}
