import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../shared/errors/resource-not-found-error'
import { FetchSystemsByCompanyUseCase } from './fetch-systems-by-company'

let usersRepository: InMemoryUsersRepository
let systemsRepository: InMemorySystemsRepository
let sut: FetchSystemsByCompanyUseCase

describe('Fetch systems by company use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchSystemsByCompanyUseCase(usersRepository, systemsRepository)
  })

  it('Should be able to fetch all systems of a company', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await systemsRepository.create({
      name: 'System 01',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: user.id,
    })

    await systemsRepository.create({
      name: 'System 02',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: user.id,
    })

    const { systems } = await sut.exec({
      companyId: user.id,
    })

    expect(systems).toHaveLength(2)
    expect(systems[0].name).toEqual('System 01')
  })

  it('Should be able to fetch a paginated list of all systems of a company', async () => {
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
      companyId: user.id,
      page: 2,
    })

    expect(systems).toHaveLength(2)
    expect(systems[0].name).toEqual('System 21')
  })

  it('Should not be able to fetch the systems of a inexistent company', async () => {
    await expect(() =>
      sut.exec({
        companyId: 'inexistentIdCompany',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
