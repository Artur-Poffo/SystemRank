import { Prisma, Review } from '@prisma/client'

export interface ReviewsRepository {
  findById(id: string): Promise<Review | null>
  findManyBySystem(systemId: string, page?: number): Promise<Review[]>
  update(review: Review): Promise<Review>
  delete(id: string): Promise<void>
  create(review: Prisma.ReviewUncheckedCreateInput): Promise<Review>
}
