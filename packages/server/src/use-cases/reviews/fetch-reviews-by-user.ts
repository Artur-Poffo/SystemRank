import { ReviewsRepository } from '@/repositories/reviews-repository'
import { UserRepository } from '@/repositories/users-repository'
import { Review } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface FetchReviewsByUserUseCaseRequest {
  userId: string
  page?: number
}

interface FetchReviewsByUserUseCaseResponse {
  reviews: Review[]
}

export class FetchReviewsByUserUseCase
  implements
    UseCase<
      FetchReviewsByUserUseCaseRequest,
      FetchReviewsByUserUseCaseResponse
    >
{
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  async exec({
    userId,
    page = 1,
  }: FetchReviewsByUserUseCaseRequest): Promise<FetchReviewsByUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const reviews = await this.reviewsRepository.findManyByUser(userId, page)

    return { reviews }
  }
}
