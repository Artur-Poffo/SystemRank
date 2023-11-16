import { PrismaReviewsRepository } from '@/repositories/prisma/prisma-reviews-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteReviewUseCase } from '../delete'

export function makeDeleteReviewUseCase() {
  const reviewsRepository = new PrismaReviewsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deleteReviewUseCase = new DeleteReviewUseCase(
    usersRepository,
    reviewsRepository,
  )

  return deleteReviewUseCase
}
