import { PrismaReviewsRepository } from '@/repositories/prisma/prisma-reviews-repository'
import { PrismaSystemsRepository } from '@/repositories/prisma/prisma-systems-repository'
import { FetchReviewsBySystemUseCase } from '../fetch-reviews-by-system'

export function makeFetchReviewsBySystemUseCase() {
  const systemsRepository = new PrismaSystemsRepository()
  const reviewsRepository = new PrismaReviewsRepository()
  const fetchSystemsByCompanyUseCase = new FetchReviewsBySystemUseCase(
    systemsRepository,
    reviewsRepository,
  )

  return fetchSystemsByCompanyUseCase
}
