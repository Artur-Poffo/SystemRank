import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findManyByQueryName(queryName: string, page?: number): Promise<User[]>
  updateProfile(user: User): Promise<User>
  create(user: Prisma.UserCreateInput): Promise<User>
}
