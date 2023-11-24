import { DefaultListItem } from "@/components/UI/DefaultListItem"
import { EmptyList } from "@/components/UI/EmptyList"
import { ReviewSummary } from "@/components/UI/ReviewSummary"
import { IReview } from "@/interfaces/IReview"

interface ReviewsListProps {
  reviews: IReview[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    reviews.length > 1 ? (
      <DefaultListItem centered={false} className="gap-x-4 gap-y-4">
        {reviews.map(review => {
          return (
            <li key={review.id} className="w-full md:w-auto" >
              <ReviewSummary reviewTitle={review.title} reviewContent={review.content} systemId={review.system_id} rating={review.rating} reviewId={review.id} />
            </li>
          )
        })}
      </DefaultListItem>
    ) : (
      <EmptyList text="Sem reviews por enquanto" />
    )
  )
}