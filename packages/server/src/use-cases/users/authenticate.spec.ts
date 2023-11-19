import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../shared/errors/invalid-credentials-error'
import { AuthenticateUserUseCase } from './authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('Should be able to authenticate a user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const { user: LoggedUser } = await sut.exec({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(LoggedUser.id)
  })

  it('Should not be able to authenticate a user with wrong email', async () => {
    await expect(() =>
      sut.exec({
        email: 'nonExistentEmail@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate a user with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('correctPassword', 6),
      role: 'COMPANY',
    })

    await expect(() =>
      sut.exec({
        email: 'nonExistentEmail@gmail.com',
        password: 'incorrectPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
