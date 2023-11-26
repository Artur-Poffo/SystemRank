'use client'

import { Rating } from "@/components/UI/Rating";
import { IReview } from "@/interfaces/IReview";
import { IUser } from "@/interfaces/IUser";
import { api } from "@/lib/ky";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ReviewContainerProps {
  review: IReview
}

export function ReviewContainer({ review }: ReviewContainerProps) {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    api.get(`users/${review.user_id}`, {
      method: 'GET',
      cache: 'no-store'
    })
      .then(res => res.json() as unknown as { user: IUser })
      .then(data => setUser(data.user))
  }, [])

  return (
    <motion.article
      id={`review-${review.id}`}
      className="w-full flex flex-col gap-5 p-4 rounded-md bg-brand-gray-600"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .3 }}
    >
      <header className="flex flex-col gap-1" >
        <div>
          <h2 className="first-letter:uppercase text-brand-gray-100 text-2xl" >{review.title}</h2>
          <Rating iconSize={24} selectedValue={review.rating} />
        </div>

        <div className="flex items-center gap-2" >
          <Link href={`/me/${user?.id}`} className="text-sm text-brand-green-300 font-bold py-px px-3 bg-brand-green-500 rounded-full" >{user?.name}</Link>
        </div>
      </header>

      <main>
        <p className="first-letter:uppercase" >{review.content}</p>
      </main>
    </motion.article>
  )
}