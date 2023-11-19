import { InMemoryReviewsRepository } from '@/repositories/in-memory/in-memory-reviews-repository'
import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { FetchReviewsBySystemUseCase } from './fetch-reviews-by-system'

let systemsRepository: InMemorySystemsRepository
let reviewsRepository: InMemoryReviewsRepository
let sut: FetchReviewsBySystemUseCase

describe('Fetch review by system', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    reviewsRepository = new InMemoryReviewsRepository()
    sut = new FetchReviewsBySystemUseCase(systemsRepository, reviewsRepository)
  })

  it('Should be able to fetch reviews by system', async () => {
    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    await systemsRepository.create({
      id: 'system-02',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-02',
    })

    await reviewsRepository.create({
      id: 'review-01',
      title: 'Review title 1',
      content: 'Review content',
      rating: 3,
      system_id: 'system-01',
      user_id: 'user-02',
    })

    await reviewsRepository.create({
      id: 'review-02',
      title: 'Review title 2',
      content: 'Review content',
      rating: 3,
      system_id: 'system-02',
      user_id: 'user-01',
    })

    const { reviews } = await sut.exec({
      systemId: 'system-01',
    })

    expect(reviews).toHaveLength(1)
    expect(reviews[0].title).toEqual('Review title 1')
  })

  it('Should be able to fetch a paginated list of reviews in a system', async () => {
    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    for (let i = 1; i <= 22; i++) {
      await reviewsRepository.create({
        id: `review-${i}`,
        title: `Review title ${i}`,
        content: 'Review content',
        rating: 3,
        system_id: 'system-01',
        user_id: 'user-01',
      })
    }

    const { reviews } = await sut.exec({
      systemId: 'system-01',
      page: 2,
    })

    expect(reviews).toHaveLength(2)
    expect(reviews[0].title).toEqual('Review title 21')
  })

  it('Should not be able fetch reviews from a inexistent system', async () => {
    await expect(() =>
      sut.exec({
        systemId: 'inexistentSystemId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
