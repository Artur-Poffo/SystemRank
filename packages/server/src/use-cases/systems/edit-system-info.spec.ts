import { InMemorySystemsRepository } from '@/repositories/in-memory/in-memory-systems-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { PermissionDeniedError } from '../shared/errors/permission-denied-error'
import { EditSystemInfoUseCase } from './edit-system-info'

let systemsRepository: InMemorySystemsRepository
let usersRepository: InMemoryUsersRepository
let sut: EditSystemInfoUseCase

describe('Edit system info use case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new EditSystemInfoUseCase(systemsRepository)
  })

  it('Should be able to edit all fields of a system', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const system = await systemsRepository.create({
      name: 'JohnDoeSystem',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: user.id,
    })

    const { system: UpdatedSystem } = await sut.exec({
      systemId: system.id,
      userId: user.id,
      name: 'New name',
      content: 'New content',
      description: 'New description',
      systemCoverImagePath: 'New cover image',
      systemLogoImagePath: 'New logo image',
      systemPageLink: 'New page link',
    })

    expect(UpdatedSystem.id).toEqual(system.id)
    expect(UpdatedSystem.name).toEqual('New name')
  })

  it('Should be possible to edit some system fields', async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const system = await systemsRepository.create({
      name: 'Original name',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: user.id,
    })

    const { system: UpdatedSystem } = await sut.exec({
      systemId: system.id,
      userId: user.id,
      description: 'Updated system description',
      systemPageLink: 'New page link',
    })

    expect(UpdatedSystem.id).toEqual(system.id)
    expect(UpdatedSystem.name).toEqual('Original name')
    expect(UpdatedSystem.description).toEqual('Updated system description')
    expect(UpdatedSystem.system_page_link).toEqual('New page link')
  })

  it("It shouldn't be possible to edit a system that isn't yours", async () => {
    const user = await usersRepository.create({
      id: 'user-01',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'COMPANY',
    })

    const system = await systemsRepository.create({
      name: 'Original name',
      description: 'A system of John Doe productions',
      content: 'Content about the system',
      user_id: user.id,
    })

    await expect(() =>
      sut.exec({
        systemId: system.id,
        userId: 'incorrectUserId',
        description: 'Updated system description',
        systemPageLink: 'New page link',
      }),
    ).rejects.toBeInstanceOf(PermissionDeniedError)
  })
})
