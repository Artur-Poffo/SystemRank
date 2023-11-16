import { InMemoryReviewsRepository } from '@/repositories/in-memory/in-memory-reviews-repository'
import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { EditReviewUseCase } from './edit'

let usersRepository: InMemoryUsersRepository
let systemsRepository: InMemorySystemsRepository
let reviewsRepository: InMemoryReviewsRepository
let sut: EditReviewUseCase

describe('Edit review of a system use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    systemsRepository = new InMemorySystemsRepository()
    reviewsRepository = new InMemoryReviewsRepository()
    sut = new EditReviewUseCase(usersRepository, reviewsRepository)
  })

  it('Should be able to edit a review', async () => {
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

    const review = await reviewsRepository.create({
      id: 'review-01',
      title: 'Review title',
      content: 'Review content',
      rating: 3,
      system_id: 'system-01',
      user_id: 'user-02',
    })

    const { review: updatedReview } = await sut.exec({
      reviewId: 'review-01',
      userId: 'user-02',
      title: 'New review title',
    })

    expect(updatedReview.id).toEqual(review.id)
    expect(updatedReview.content).toEqual('Review content')
  })

  it('Should not be possible to update a inexistent review', async () => {
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

    await expect(() =>
      sut.exec({
        reviewId: 'inexistentReviewId',
        userId: 'user-02',
        title: 'New review title',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be possible to update a review with a inexistent user', async () => {
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

    await reviewsRepository.create({
      id: 'review-01',
      title: 'Review title',
      content: 'Review content',
      rating: 3,
      system_id: 'system-01',
      user_id: 'user-02',
    })

    await expect(() =>
      sut.exec({
        reviewId: 'review-01',
        userId: 'inexistentUserId',
        title: 'New review title',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be possible to update a review with a wrong user', async () => {
    // System owner user
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    // Review owner user
    await usersRepository.create({
      id: 'user-02',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    // System
    await systemsRepository.create({
      id: 'system-01',
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    await reviewsRepository.create({
      id: 'review-01',
      title: 'Review title',
      content: 'Review content',
      rating: 3,
      system_id: 'system-01',
      user_id: 'user-02',
    })

    // Other user
    await usersRepository.create({
      id: 'user-03',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await expect(() =>
      sut.exec({
        reviewId: 'review-01',
        userId: 'user-03', // trying to update the review with the wrong user
        title: 'New review title',
      }),
    ).rejects.toBeInstanceOf(PermissionDeniedError)
  })
})
