import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { GetSystemDetailsUseCase } from './get-system-details'

let usersRepository: InMemoryUsersRepository
let systemsRepository: InMemorySystemsRepository
let sut: GetSystemDetailsUseCase

describe('Get system details use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetSystemDetailsUseCase(systemsRepository)
  })

  it('Should be able to get system details', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const { id: SystemId } = await systemsRepository.create({
      name: 'System 01',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: user.id,
    })

    const { system } = await sut.exec({
      systemId: SystemId,
    })

    expect(system.id).toEqual(SystemId)
    expect(system.name).toEqual('System 01')
  })

  it('Should not be able to get details of a inexistent system', async () => {
    await expect(() =>
      sut.exec({
        systemId: 'inexistentSystemId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
