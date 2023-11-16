import { ReviewsRepository } from '@/repositories/reviews-repository'
import { UserRepository } from '@/repositories/users-repository'
import { Review } from '@prisma/client'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface DeleteReviewUseCaseRequest {
  reviewId: string
  userId: string
}

interface DeleteReviewUseCaseResponse {
  review: Review
}

export class DeleteReviewUseCase
  implements UseCase<DeleteReviewUseCaseRequest, DeleteReviewUseCaseResponse>
{
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  async exec({
    reviewId,
    userId,
  }: DeleteReviewUseCaseRequest): Promise<DeleteReviewUseCaseResponse> {
    const review = await this.reviewsRepository.findById(reviewId)
    const user = await this.usersRepository.findById(userId)

    if (!review || !user) {
      throw new ResourceNotFoundError()
    }

    if (review.user_id !== userId) {
      throw new PermissionDeniedError()
    }

    await this.reviewsRepository.delete(reviewId)

    return { review }
  }
}
