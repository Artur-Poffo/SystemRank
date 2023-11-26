'use client'

import { IReview } from "@/interfaces/IReview"
import { api } from "@/lib/ky"
import { useEffect, useState } from "react"
import { ReviewContainer } from "../components/ReviewContainer"

interface ReviewsListSectionProps {
  systemId: string
}

export function ReviewsListSection({ systemId }: ReviewsListSectionProps) {
  const [reviews, setReviews] = useState<IReview[]>([])

  useEffect(() => {
    api.get(`reviews/system/${systemId}`, {
      method: 'GET',
      cache: 'no-store'
    })
      .then(res => res.json() as unknown as { reviews: IReview[] })
      .then(data => setReviews(data.reviews))
  }, [])

  return (
    <section id="reviews" className="w-full mt-16 pb-14 px-4 max-w-screen-lg mx-auto flex flex-col items-center" >
      <ul className="w-full flex flex-col items-center gap-6" >
        {reviews.map(review => {
          return (
            <li key={review.id} className="w-full" >
              <ReviewContainer review={review} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}