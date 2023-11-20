import { prisma } from '@/lib/prisma'
import { Prisma, System } from '@prisma/client'
import { SystemsRepository } from '../systems-repository'

export class PrismaSystemsRepository implements SystemsRepository {
  async findByName(name: string): Promise<System | null> {
    const system = await prisma.system.findFirst({
      where: {
        name,
      },
    })

    return system
  }

  async findById(id: string): Promise<System | null> {
    const system = await prisma.system.findUnique({
      where: {
        id,
      },
    })

    return system
  }

  async findManyByCompanyId(
    companyId: string,
    page?: number | undefined,
  ): Promise<System[]> {
    if (page) {
      const systems = await prisma.system.findMany({
        where: {
          user_id: companyId,
        },
        orderBy: {
          created_at: 'desc',
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return systems.slice((page - 1) * 20, page * 20)
    } else {
      const systems = await prisma.system.findMany({
        where: {
          user_id: companyId,
        },
        orderBy: {
          created_at: 'desc',
        },
      })

      return systems
    }
  }

  async findManyByQueryName(
    queryName: string,
    page?: number | undefined,
  ): Promise<System[]> {
    if (page) {
      const systems = await prisma.system.findMany({
        where: {
          name: { contains: queryName },
        },
        orderBy: {
          created_at: 'desc',
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return systems
    } else {
      const systems = await prisma.system.findMany({
        where: {
          name: { contains: queryName },
        },
        orderBy: {
          created_at: 'desc',
        },
      })

      return systems
    }
  }

  async findAll(page?: number | undefined): Promise<System[]> {
    if (page) {
      const systems = await prisma.system.findMany({
        orderBy: {
          created_at: 'desc',
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return systems
    } else {
      const systems = await prisma.system.findMany({
        orderBy: {
          created_at: 'desc',
        },
      })

      return systems
    }
  }

  async update(system: System): Promise<System> {
    const updatedSystem = await prisma.system.update({
      data: system,
      where: {
        id: system.id,
      },
    })

    return updatedSystem
  }

  async delete(id: string): Promise<void> {
    await prisma.system.delete({
      where: {
        id,
      },
    })
  }

  async create(system: Prisma.SystemUncheckedCreateInput): Promise<System> {
    const newSystem = await prisma.system.create({
      data: system,
    })

    return newSystem
  }
}
