import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { DeleteSystemUseCase } from './delete'

let systemsRepository: InMemorySystemsRepository
let usersRepository: InMemoryUsersRepository
let sut: DeleteSystemUseCase

describe('Register system use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteSystemUseCase(systemsRepository, usersRepository)
  })

  it('Should be able to delete a system', async () => {
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

    const { system } = await sut.exec({
      systemId: 'system-01',
      userId: 'user-01',
    })

    expect(system.id).toEqual('system-01')
  })

  it('Should not be possible to delete a inexistent system', async () => {
    await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await expect(() =>
      sut.exec({
        systemId: 'inexistentSystemId',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be possible to delete a system with a inexistent user', async () => {
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
        systemId: 'system-01',
        userId: 'inexistentUserId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Shouldn`t be possible to delete a system that isn`t yours', async () => {
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
        systemId: 'system-01',
        userId: 'user-02',
      }),
    ).rejects.toBeInstanceOf(PermissionDeniedError)
  })
})
