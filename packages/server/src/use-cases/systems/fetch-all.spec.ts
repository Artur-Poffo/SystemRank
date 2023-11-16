import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchAllUseCase } from './fetch-all'

let usersRepository: InMemoryUsersRepository
let systemsRepository: InMemorySystemsRepository
let sut: FetchAllUseCase

describe('Fetch all registered systems use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchAllUseCase(systemsRepository)
  })

  it('Should be able to fetch all registered systems', async () => {
    const firstUser = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const secondUser = await usersRepository.create({
      id: 'user-02',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await systemsRepository.create({
      name: 'System 01',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: firstUser.id,
    })

    await systemsRepository.create({
      name: 'System 02',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: secondUser.id,
    })

    const { systems } = await sut.exec({})

    expect(systems).toHaveLength(2)
    expect(systems[0].name).toEqual('System 01')
  })

  it('Should be able to fetch a paginated list of all registered systems', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    for (let i = 1; i <= 22; i++) {
      await systemsRepository.create({
        name: `System ${i}`,
        description: 'A system of John Doe productions',
        content: 'Content about the system',
        user_id: user.id,
      })
    }

    const { systems } = await sut.exec({
      page: 2,
    })

    expect(systems).toHaveLength(2)
    expect(systems[0].name).toEqual('System 21')
  })
})
