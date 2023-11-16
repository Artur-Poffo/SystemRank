import { ReviewsRepository } from '@/repositories/reviews-repository'
import { SystemsRepository } from '@/repositories/systems-repository'
import { UserRepository } from '@/repositories/users-repository'
import { Review } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'
import { ReviewAlreadyExistsError } from './errors/review-already-exists-error'
import { TheSystemOwnerCannotMakeReviewsError } from './errors/the-system-owner-cannot-make-reviews-error'

interface CreateReviewUseCaseRequest {
  title: string
  content: string
  rating: number
  userId: string
  systemId: string
}

interface CreateReviewUseCaseResponse {
  review: Review
}

export class CreateReviewUseCase
  implements UseCase<CreateReviewUseCaseRequest, CreateReviewUseCaseResponse>
{
  constructor(
    private readonly systemsRepository: SystemsRepository,
    private readonly usersRepository: UserRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  async exec({
    title,
    content,
    rating,
    userId,
    systemId,
  }: CreateReviewUseCaseRequest): Promise<CreateReviewUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const system = await this.systemsRepository.findById(systemId)

    if (!user || !system) {
      throw new ResourceNotFoundError()
    }

    if (user.role === 'COMPANY') {
      const userSystems =
        await this.systemsRepository.findManyByCompanyId(userId)

      const theUserIsTheOwner = userSystems.find(
        (system) => system.id === systemId,
      )

      if (theUserIsTheOwner) {
        throw new TheSystemOwnerCannotMakeReviewsError()
      }
    }

    const doesReviewAlreadyExists = (
      await this.reviewsRepository.findManyBySystem(systemId)
    ).find((item) => item.user_id === userId)

    if (doesReviewAlreadyExists) {
      throw new ReviewAlreadyExistsError()
    }

    const newReview = await this.reviewsRepository.create({
      title,
      content,
      rating,
      user_id: userId,
      system_id: systemId,
    })

    return { review: newReview }
  }
}
