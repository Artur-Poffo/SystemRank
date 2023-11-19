import { InMemoryReviewsRepository } from '@/repositories/in-memory/in-memory-reviews-repository'
import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { CreateReviewUseCase } from './create'
import { ReviewAlreadyExistsError } from './errors/review-already-exists-error'
import { TheSystemOwnerCannotMakeReviewsError } from './errors/the-system-owner-cannot-make-reviews-error'

let usersRepository: InMemoryUsersRepository
let systemsRepository: InMemorySystemsRepository
let reviewsRepository: InMemoryReviewsRepository
let sut: CreateReviewUseCase

describe('Create review for a system use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    systemsRepository = new InMemorySystemsRepository()
    reviewsRepository = new InMemoryReviewsRepository()
    sut = new CreateReviewUseCase(
      systemsRepository,
      usersRepository,
      reviewsRepository,
    )
  })

  it('Should be able to create a new review of system', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await usersRepository.create({
      id: 'user-02',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    const { review } = await sut.exec({
      title: 'Review title',
      content: 'Review content',
      rating: 3,
      systemId: 'system-01',
      userId: 'user-02',
    })

    expect(review.id).toEqual(expect.any(String))
    expect(review.title).toEqual('Review title')
  })

  it('Should not be possible review a inexistent system', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await expect(() =>
      sut.exec({
        title: 'Review title',
        content: 'Review content',
        rating: 3,
        systemId: 'inexistentSystemId',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be possible to review a system with a inexistent user', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    await expect(() =>
      sut.exec({
        title: 'Review title',
        content: 'Review content',
        rating: 3,
        systemId: 'system-01',
        userId: 'inexistentUserId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be possible to review your own system', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    await expect(() =>
      sut.exec({
        title: 'Review title',
        content: 'Review content',
        rating: 3,
        systemId: 'system-01',
        userId: 'user-01', // trying to review your own system
      }),
    ).rejects.toBeInstanceOf(TheSystemOwnerCannotMakeReviewsError)
  })

  it('Should not be possible review a system twice with same user', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await usersRepository.create({
      id: 'user-02',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'MEMBER',
    })

    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    await sut.exec({
      title: 'Review title',
      content: 'Review content',
      rating: 3,
      systemId: 'system-01',
      userId: 'user-02',
    })

    await expect(() =>
      sut.exec({
        title: 'Second review title',
        content: 'Second review content',
        rating: 3,
        systemId: 'system-01',
        userId: 'user-02',
      }),
    ).rejects.toBeInstanceOf(ReviewAlreadyExistsError)
  })
})
