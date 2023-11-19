import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { QuerySystemsUseCase } from './query-systems'

let systemsRepository: InMemorySystemsRepository
let sut: QuerySystemsUseCase

describe('Query by systems use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    sut = new QuerySystemsUseCase(systemsRepository)
  })

  it('Should be able to query by systems', async () => {
    await systemsRepository.create({
      name: 'System 01',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    await systemsRepository.create({
      name: 'System 02',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: 'user-01',
    })

    const { systems } = await sut.exec({
      query: '01',
    })

    expect(systems).toHaveLength(1)
    expect(systems[0].name).toEqual('System 01')
  })

  it('Should be able to query a paginated list of companies', async () => {
    for (let i = 1; i <= 22; i++) {
      await systemsRepository.create({
        name: `System ${i}`,
        description: 'A system of John Doe productions',
        content: 'Content about the system',
        user_id: 'user-01',
      })
    }

    const { systems } = await sut.exec({
      query: 'System',
      page: 2,
    })

    expect(systems).toHaveLength(2)
    expect(systems[0].name).toEqual('System 21')
  })
})
