import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { FetchAllCompaniesUseCase } from './fetch-all-companies'

let usersRepository: InMemoryUsersRepository
let sut: FetchAllCompaniesUseCase

describe('Fetch all companies use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchAllCompaniesUseCase(usersRepository)
  })

  it('Should be able to fetch all companies', async () => {
    await usersRepository.create({
      name: 'John Doe Company',
      email: 'johndoe@company.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await usersRepository.create({
      name: 'John Doe Just a Member',
      email: 'johndoe@member.com',
      password_hash: await hash('123456', 6),
      role: 'MEMBER',
    })

    const { companies } = await sut.exec({})

    expect(companies).toHaveLength(1)
    expect(companies[0].name).toEqual('John Doe Company')
  })

  it('Should be able to fetch a paginated list of all companies', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        name: `John Doe Company ${i}`,
        email: 'johndoe@company.com',
        password_hash: await hash('123456', 6),
        role: 'COMPANY',
      })
    }

    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        name: `John Doe Just a Member ${i}`,
        email: 'johndoe@member.com',
        password_hash: await hash('123456', 6),
        role: 'MEMBER',
      })
    }

    const { companies } = await sut.exec({
      page: 2,
    })

    expect(companies).toHaveLength(2)
    expect(companies[0].name).toEqual('John Doe Company 21')
  })
})
