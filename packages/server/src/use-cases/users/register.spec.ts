import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUserUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('Should be able to register a new user', async () => {
    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      isCompany: true,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to register a new user with same email twice', async () => {
    const email = 'johndoe@gmail.com'

    await sut.exec({
      name: 'John Doe',
      email,
      password: '123456',
      isCompany: true,
    })

    await expect(() =>
      sut.exec({
        name: 'John Doe',
        email,
        password: '123456',
        isCompany: true,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      isCompany: true,
    })

    const isPasswordEncrypted = await compare('123456', user.password_hash)

    expect(isPasswordEncrypted).toEqual(true)
  })
})
