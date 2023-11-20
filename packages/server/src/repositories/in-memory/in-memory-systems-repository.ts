import { Prisma, System } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SystemsRepository } from '../systems-repository'

export class InMemorySystemsRepository implements SystemsRepository {
  private readonly items: System[] = []

  async findByName(name: string): Promise<System | null> {
    const system = this.items.find((system) => system.name === name)

    if (!system) {
      return null
    }

    return system
  }

  async findById(id: string): Promise<System | null> {
    const system = this.items.find((system) => system.id === id)

    if (!system) {
      return null
    }

    return system
  }

  async findManyByCompanyId(
    companyId: string,
    page?: number,
  ): Promise<System[]> {
    const systems = this.items.filter((item) => item.user_id === companyId)

    if (page) {
      return systems.slice((page - 1) * 20, page * 20)
    } else {
      return systems
    }
  }

  async findManyByQueryName(
    queryName: string,
    page?: number | undefined,
  ): Promise<System[]> {
    const systems = this.items.filter((item) => item.name.includes(queryName))

    if (page) {
      return systems.slice((page - 1) * 20, page * 20)
    } else {
      return systems
    }
  }

  async findAll(page?: number): Promise<System[]> {
    const systems = [...this.items]

    if (page) {
      return systems.slice((page - 1) * 20, page * 20)
    } else {
      return systems
    }
  }

  async update(system: System): Promise<System> {
    const findItemIndex = this.items.findIndex((item) => item.id === system.id)

    this.items[findItemIndex] = system

    return this.items[findItemIndex]
  }

  async delete(id: string): Promise<void> {
    const findItemIndex = this.items.findIndex((item) => item.id === id)

    if (findItemIndex !== -1) {
      this.items.splice(findItemIndex, 1)
    }
  }

  async create(system: Prisma.SystemUncheckedCreateInput): Promise<System> {
    const newSystem: System = {
      id: system.id || randomUUID(),
      name: system.name,
      description: system.description,
      content: system.content,
      system_logo_image_path:
        system.system_logo_image_path || 'default-logo-image-path',
      system_cover_image_path:
        system.system_cover_image_path || 'default-cover-image-path',
      system_page_link: system.system_page_link || 'default-system-page-link',
      created_at: new Date(),
      user_id: system.user_id,
    }

    this.items.push(newSystem)

    return newSystem
  }
}
