import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../users-repository'

export class PrismaUsersRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findManyByQueryName(
    queryName: string,
    page?: number | undefined,
  ): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        name: { contains: queryName },
      },
    })

    if (page) {
      return users.slice((page - 1) * 20, page * 20)
    } else {
      return users
    }
  }

  async updateProfile(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      data: user,
      where: {
        id: user.id,
      },
    })

    return updatedUser
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const newUser = await prisma.user.create({
      data: user,
    })

    return newUser
  }
}
