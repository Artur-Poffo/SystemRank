import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { SystemAlreadyExistsError } from './errors/system-already-exists-error'
import { RegisterSystemUseCase } from './register'

let systemsRepository: InMemorySystemsRepository
let usersRepository: InMemoryUsersRepository
let sut: RegisterSystemUseCase

describe('Register system use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterSystemUseCase(systemsRepository, usersRepository)
  })

  it('Should be able to register a new system', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const { system } = await sut.exec({
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      userId: user.id,
    })

    expect(system.id).toEqual(expect.any(String))
  })

  it('Should not be able register a new system with same name twice', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await sut.exec({
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      userId: user.id,
    })

    await expect(() =>
      sut.exec({
        name: 'JohnDoeSystem',
        description: 'A system of John Doe productions',
        content: 'Content about the system',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(SystemAlreadyExistsError)
  })

  it('Should not be possible to register a system without having "company" permission', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'MEMBER',
    })

    await expect(() =>
      sut.exec({
        name: 'JohnDoeSystem',
        description: 'A system of John Doe productions',
        content: 'Content about the system',
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(PermissionDeniedError)
  })
})
