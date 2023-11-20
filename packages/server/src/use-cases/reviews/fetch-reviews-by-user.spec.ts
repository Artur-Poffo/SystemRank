import { InMemoryReviewsRepository } from '@/repositories/in-memory/in-memory-reviews-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { FetchReviewsByUserUseCase } from './fetch-reviews-by-user'

let reviewsRepository: InMemoryReviewsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchReviewsByUserUseCase

describe('Fetch review by system', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    reviewsRepository = new InMemoryReviewsRepository()
    sut = new FetchReviewsByUserUseCase(usersRepository, reviewsRepository)
  })

  it('Should be able to fetch reviews by user', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await reviewsRepository.create({
      id: 'review-01',
      title: 'Review title 1',
      content: 'Review content',
      rating: 3,
      system_id: 'system-01',
      user_id: 'user-01',
    })

    await reviewsRepository.create({
      id: 'review-02',
      title: 'Review title 2',
      content: 'Review content',
      rating: 3,
      system_id: 'system-02',
      user_id: 'user-02',
    })

    const { reviews } = await sut.exec({
      userId: 'user-01',
    })

    expect(reviews).toHaveLength(1)
    expect(reviews[0].title).toEqual('Review title 1')
  })

  it('Should be able to fetch a paginated list of reviews of a user', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
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
      userId: 'user-01',
      page: 2,
    })

    expect(reviews).toHaveLength(2)
    expect(reviews[0].title).toEqual('Review title 21')
  })

  it('Should not be able fetch reviews from a inexistent user', async () => {
    await expect(() =>
      sut.exec({
        userId: 'inexistentUserId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
