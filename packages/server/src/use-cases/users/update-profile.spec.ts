import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { UpdateUserProfileUseCase } from './update-profile'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserProfileUseCase

describe('Update user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(usersRepository)
  })

  it('Should be able to update user profile', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const { user } = await sut.exec({
      userId: 'user-01',
      email: 'newEmail@gmail.com',
      profileImagePath: 'https://logoimage.com/image.png',
    })

    expect(user.id).toEqual('user-01')
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('newEmail@gmail.com')
  })

  it('Should not be able to update user profile of a inexistent user', async () => {
    await expect(() =>
      sut.exec({
        userId: 'user-01',
        email: 'newEmail@gmail.com',
        profileImagePath: 'https://logoimage.com/image.png',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
