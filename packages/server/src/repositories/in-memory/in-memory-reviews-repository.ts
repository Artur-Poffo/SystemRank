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
    const reviews = this.items.filter((item) => item.system_id === systemId)

    if (page) {
      return reviews.slice((page - 1) * 20, page * 20)
    } else {
      return reviews
    }
  }

  async findManyByUser(
    userId: string,
    page?: number | undefined,
  ): Promise<Review[]> {
    const reviews = this.items.filter((item) => item.user_id === userId)

    if (page) {
      return reviews.slice((page - 1) * 20, page * 20)
    } else {
      return reviews
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
      created_at: new Date(),
      system_id: review.system_id,
      user_id: review.user_id,
    }

    this.items.push(newReview)

    return newReview
  }
}
