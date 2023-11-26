'use client'

import { DefaultDialog } from "@/components/UI/DefaultDialog";
import { Rating } from "@/components/UI/Rating";
import { useAuth } from "@/hooks/useAuth";
import { IReview } from "@/interfaces/IReview";
import { IUser } from "@/interfaces/IUser";
import { api } from "@/lib/ky";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { EditReviewForm } from "./EditReviewForm";

interface ReviewContainerProps {
  review: IReview
  reviews: IReview[]
  setReviews: (reviews: IReview[]) => void
}

export function ReviewContainer({ review, reviews, setReviews }: ReviewContainerProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const [isEditReviewDialogOpen, setIsEditReviewDialogOpen] = useState(false)
  const { user: authenticatedUser } = useAuth()

  const isTheAuthor = user?.id === authenticatedUser?.id

  useEffect(() => {
    api.get(`users/${review.user_id}`, {
      method: 'GET',
      cache: 'no-store'
    })
      .then(res => res.json() as unknown as { user: IUser })
      .then(data => setUser(data.user))
  }, [])

  async function handleDeleteReview() {
    await api.delete(`reviews/${review.id}`, {
      method: "DELETE"
    })

    const tempReviews = [...reviews]
    const deletedReviewIndex = tempReviews.findIndex(item => item.id === review.id)
    tempReviews.splice(deletedReviewIndex, 1)

    setReviews(tempReviews)
  }

  return (
    <motion.article
      id={`review-${review.id}`}
      className="w-full flex flex-col gap-5 p-4 rounded-md bg-brand-gray-600"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .3 }}
    >
      <header className="flex justify-between" >
        <div className="flex flex-col gap-1">
          <div>
            <h2 className="first-letter:uppercase text-brand-gray-100 text-2xl" >{review.title}</h2>
            <Rating iconSize={24} selectedValue={review.rating} />
          </div>

          <div className="flex items-center gap-2" >
            <Link href={`/me/${user?.id}`} className="text-sm text-brand-green-300 font-bold py-px px-3 bg-brand-green-500 rounded-full" >{user?.name}</Link>
          </div>
        </div>

        {isTheAuthor && (
          <div className="flex items-start gap-4" >
            <DefaultDialog isOpen={isEditReviewDialogOpen} setIsOpen={setIsEditReviewDialogOpen} dialogContent={<EditReviewForm setIsEditReviewDialogOpen={setIsEditReviewDialogOpen} review={review} reviews={reviews} setReviews={setReviews} />} title="Editar review" description="Reveja sua opinião e edite sua review" >
              <button className="p-2 rounded-md bg-brand-gray-900">
                <FaEdit size={16} />
              </button>
            </DefaultDialog>

            <button className="p-2 rounded-md bg-brand-gray-900 border border-red-600" onClick={handleDeleteReview} >
              <FaTrash size={16} />
            </button>
          </div>
        )}
      </header>

      <main>
        <p className="first-letter:uppercase" >{review.content}</p>
      </main>
    </motion.article>
  )
}