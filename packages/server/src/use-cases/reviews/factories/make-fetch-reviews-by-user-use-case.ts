import { PrismaReviewsRepository } from '@/repositories/prisma/prisma-reviews-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchReviewsByUserUseCase } from '../fetch-reviews-by-user'

export function makeFetchReviewsByUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const reviewsRepository = new PrismaReviewsRepository()
  const fetchReviewsByUserUseCase = new FetchReviewsByUserUseCase(
    usersRepository,
    reviewsRepository,
  )

  return fetchReviewsByUserUseCase
}
