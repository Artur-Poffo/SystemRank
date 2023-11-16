import { Prisma, Review } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ReviewsRepository } from '../reviews-repository'

export class InMemoryReviewsRepository implements ReviewsRepository {
  private readonly items: Review[] = []

  async findById(id: string): Promise<Review | null> {
    const review = this.items.find((item) => item.id === id)

    if (!review) {
      return null
    }

    return review
  }

  async findManyBySystem(systemId: string, page?: number): Promise<Review[]> {
    const systems = this.items.filter((item) => item.system_id === systemId)

    if (page) {
      return systems.slice((page - 1) * 20, page * 20)
    } else {
      return systems
    }
  }

  async update(review: Review): Promise<Review> {
    const findItemIndex = this.items.findIndex((item) => item.id === review.id)

    this.items[findItemIndex] = review

    return this.items[findItemIndex]
  }

  async delete(id: string): Promise<void> {
    const findItemIndex = this.items.findIndex((item) => item.id === id)

    if (findItemIndex !== -1) {
      this.items.splice(findItemIndex, 1)
    }
  }

  async create(review: Prisma.ReviewUncheckedCreateInput): Promise<Review> {
    const newReview: Review = {
      id: review.id || randomUUID(),
      title: review.title,
      content: review.content,
      rating: review.rating,
      system_id: review.system_id,
      user_id: review.user_id,
    }

    this.items.push(newReview)

    return newReview
  }
}
