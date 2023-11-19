import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { QueryCompaniesUseCase } from './query-companies'

let usersRepository: InMemoryUsersRepository
let sut: QueryCompaniesUseCase

describe('Query by companies use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new QueryCompaniesUseCase(usersRepository)
  })

  it('Should be able to query by companies', async () => {
    await usersRepository.create({
      name: 'John Doe Company',
      email: 'johndoe@company.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    await usersRepository.create({
      name: 'John Doe Second Company',
      email: 'johndoe@company.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const { companies } = await sut.exec({
      query: 'Second',
    })

    expect(companies).toHaveLength(1)
    expect(companies[0].name).toEqual('John Doe Second Company')
  })

  it('Should be able to query a paginated list of companies', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        name: `John Doe Company ${i}`,
        email: 'johndoe@company.com',
        password_hash: await hash('123456', 6),
        role: 'COMPANY',
      })
    }

    const { companies } = await sut.exec({
      query: 'Company',
      page: 2,
    })

    expect(companies).toHaveLength(2)
    expect(companies[0].name).toEqual('John Doe Company 21')
  })
})
