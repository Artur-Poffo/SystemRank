import { prisma } from '@/lib/prisma'
import { Prisma, Review } from '@prisma/client'
import { ReviewsRepository } from '../reviews-repository'

export class PrismaReviewsRepository implements ReviewsRepository {
  async findById(id: string): Promise<Review | null> {
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    })

    return review
  }

  async findManyBySystem(
    systemId: string,
    page?: number | undefined,
  ): Promise<Review[]> {
    if (page) {
      const systems = await prisma.review.findMany({
        where: {
          system_id: systemId,
        },
        take: 20,
        skip: (page - 1) * 20,
      })

      return systems
    } else {
      const systems = await prisma.review.findMany({
        where: {
          system_id: systemId,
        },
      })

      return systems
    }
  }

  async update(review: Review): Promise<Review> {
    const updatedReview = await prisma.review.update({
      data: review,
      where: {
        id: review.id,
      },
    })

    return updatedReview
  }

  async delete(id: string): Promise<void> {
    await prisma.review.delete({
      where: {
        id,
      },
    })
  }

  async create(review: Prisma.ReviewUncheckedCreateInput): Promise<Review> {
    const newReview = await prisma.review.create({
      data: review,
    })

    return newReview
  }
}
