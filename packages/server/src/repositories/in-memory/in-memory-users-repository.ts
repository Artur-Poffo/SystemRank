import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UserRepository } from '../users-repository'

export class InMemoryUsersRepository implements UserRepository {
  private readonly items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findManyByQueryName(queryName: string, page?: number): Promise<User[]> {
    const users = this.items.filter((item) => item.name.includes(queryName))

    if (page) {
      return users.slice((page - 1) * 20, page * 20)
    } else {
      return users
    }
  }

  async updateProfile(user: User): Promise<User> {
    const findItemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[findItemIndex] = user

    return this.items[findItemIndex]
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const newUser: User = {
      id: user.id || randomUUID(),
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      profile_image_path: user.profile_image_path || 'default-profile-image',
      banner_profile_image_path:
        user.banner_profile_image_path || 'default-banner-image',
      role: user.role || 'MEMBER',
      created_at: new Date(),
    }

    this.items.push(newUser)

    return newUser
  }
}
