import { Prisma, System } from '@prisma/client'

export interface SystemsRepository {
  findByName(name: string): Promise<System | null>
  findById(id: string): Promise<System | null>
  findManyByCompanyId(companyId: string, page?: number): Promise<System[]>
  findManyByQueryName(queryName: string, page?: number): Promise<System[]>
  findAll(page?: number): Promise<System[]>
  update(system: System): Promise<System>
  delete(id: string): Promise<void>
  create(system: Prisma.SystemUncheckedCreateInput): Promise<System>
}
