import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { GetUserProfileUserUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUserUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUserUseCase(usersRepository)
  })

  it('Should be able to get a user profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const { user: Profile } = await sut.exec({
      userId: user.id,
    })

    expect(user.name).toEqual(Profile.name)
  })

  it('Should not be able to get a user profile of a inexistent user', async () => {
    await expect(() =>
      sut.exec({
        userId: 'inexistentUserId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
