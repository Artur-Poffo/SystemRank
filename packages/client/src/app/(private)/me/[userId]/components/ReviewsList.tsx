import { DefaultListItem } from "@/components/UI/DefaultListItem"
import { EmptyList } from "@/components/UI/EmptyList"
import { ReviewContainer } from "@/components/UI/ReviewContainer"
import { IReview } from "@/interfaces/IReview"

interface ReviewsListProps {
    reviews: IReview[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
    return (
        reviews.length > 1 ? (
            <DefaultListItem centered={false}>
            {reviews.map(review => {
              return (
                <li key={review.id} className="w-full md:w-auto" >
                  <ReviewContainer name={review.title} content={review.content} />
                </li>
              )
            })}
          </DefaultListItem>
          ) : (
            <EmptyList text="Sem reviews por enquanto" />
          )
    )
}