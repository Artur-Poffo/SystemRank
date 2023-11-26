import { ReviewsRepository } from '@/repositories/reviews-repository'
import { SystemsRepository } from '@/repositories/systems-repository'
import { Review } from '@prisma/client'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UseCase } from '../shared/interfaces/UseCase'

interface FetchReviewsBySystemUseCaseRequest {
  systemId: string
  page?: number
}

interface FetchReviewsBySystemUseCaseResponse {
  reviews: Review[]
}

export class FetchReviewsBySystemUseCase
  implements
    UseCase<
      FetchReviewsBySystemUseCaseRequest,
      FetchReviewsBySystemUseCaseResponse
    >
{
  constructor(
    private readonly systemsRepository: SystemsRepository,
    private readonly reviewsRepository: ReviewsRepository,
  ) {}

  async exec({
    systemId,
    page,
  }: FetchReviewsBySystemUseCaseRequest): Promise<FetchReviewsBySystemUseCaseResponse> {
    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundError()
    }

    const reviews = await this.reviewsRepository.findManyBySystem(
      systemId,
      page,
    )

    return { reviews }
  }
}
