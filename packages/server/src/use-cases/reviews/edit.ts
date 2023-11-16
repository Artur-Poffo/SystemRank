import { ReviewsRepository } from '@/repositories/reviews-repository'
import { UserRepository } from '@/repositories/users-repository'
import { Review } from '@prisma/client'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface EditReviewUseCaseRequest {
  title?: string
  content?: string
  rating?: number
  reviewId: string
  userId: string
}

interface EditReviewUseCaseResponse {
  review: Review
}

export class EditReviewUseCase
  implements UseCase<EditReviewUseCaseRequest, EditReviewUseCaseResponse>
{
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  async exec({
    title,
    content,
    rating,
    reviewId,
    userId,
  }: EditReviewUseCaseRequest): Promise<EditReviewUseCaseResponse> {
    const review = await this.reviewsRepository.findById(reviewId)
    const user = await this.usersRepository.findById(userId)

    if (!review || !user) {
      throw new ResourceNotFoundError()
    }

    if (review.user_id !== userId) {
      throw new PermissionDeniedError()
    }

    const updatedReview = await this.reviewsRepository.update({
      id: review.id,
      title: title || review.title,
      content: content || review.content,
      rating: rating || review.rating,
      system_id: review.system_id,
      user_id: review.user_id,
    })

    return { review: updatedReview }
  }
}
