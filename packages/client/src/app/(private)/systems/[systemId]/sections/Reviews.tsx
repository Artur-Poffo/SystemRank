'use client'

import { DefaultButton } from "@/components/UI/DefaultButton"
import { DefaultDialog } from "@/components/UI/DefaultDialog"
import { EmptyList } from "@/components/UI/EmptyList"
import { useAuth } from "@/hooks/useAuth"
import { IReview } from "@/interfaces/IReview"
import { fetchReviewsOfSystem } from "@/server-functions/fetchReviewsOfSystem"
import { useEffect, useState } from "react"
import { CreateReviewForm } from "../components/CreateReviewForm"
import { ReviewContainer } from "../components/ReviewContainer"

interface ReviewsListSectionProps {
  systemId: string
  isTheOwner: boolean
}

export function ReviewsListSection({ systemId, isTheOwner }: ReviewsListSectionProps) {
  const [reviews, setReviews] = useState<IReview[]>([])
  const [isCreateReviewDialogOpen, setIsCreateReviewDialogOpen] = useState(false)
  const { user } = useAuth()

  const authenticatedUserAlreadyReview = reviews.findIndex(review => review.user_id === user?.id)

  useEffect(() => {
    fetchReviewsOfSystem(systemId)
      .then(reviews => setReviews(reviews))
  }, [])

  // REVIEW OF LOGGED USER IN FIRST
  useEffect(() => {
    if (authenticatedUserAlreadyReview !== -1) {
      const tempReviews = [...reviews]
      const removedReview = tempReviews.splice(authenticatedUserAlreadyReview, 1)[0]
      tempReviews.unshift(removedReview)

      setReviews(tempReviews)
    }
  }, [authenticatedUserAlreadyReview])

  return (
    <section id="reviews" className="w-full mt-16 pb-14 px-4 max-w-screen-lg mx-auto flex flex-col items-center" >
      {authenticatedUserAlreadyReview === -1 && !isTheOwner && (
        <DefaultDialog isOpen={isCreateReviewDialogOpen} setIsOpen={setIsCreateReviewDialogOpen} dialogContent={<CreateReviewForm setIsCreateReviewDialogOpen={setIsCreateReviewDialogOpen} systemId={systemId} setReviews={setReviews} />} title="Avalie o sistema" description="Avalie o sistema para ajudar outras pessoas a escolherem seu próximo sistema principal" >
          <DefaultButton text="Avaliar sistema" className="w-full mb-4" />
        </DefaultDialog>
      )}

      <ul className="w-full flex flex-col items-center gap-6" >
        {reviews.length > 0 ? reviews.map(review => {
          return (
            <li key={review.id} className="w-full" >
              <ReviewContainer review={review} reviews={reviews} setReviews={setReviews} />
            </li>
          )
        }) : (
          <EmptyList text="Nenhuma review por enquanto" />
        )}
      </ul>
    </section>
  )
}