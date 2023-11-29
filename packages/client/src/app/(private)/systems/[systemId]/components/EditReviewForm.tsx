'use client'

import { DefaultButton } from "@/components/UI/DefaultButton";
import { DefaultInput } from "@/components/UI/DefaultInput";
import { DefaultTextArea } from "@/components/UI/DefaultTextArea";
import { FormError } from "@/components/UI/FormError";
import { IReview } from "@/interfaces/IReview";
import { api } from "@/lib/ky";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditReviewFormProps {
  review: IReview
  reviews: IReview[]
  setReviews: (reviews: IReview[]) => void
  setIsEditReviewDialogOpen: (isEditReviewDialogOpen: boolean) => void
}

const editReviewFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").nullable(),
  content: z.string().min(5, "O conteúdo da review deve ter pelo menos 5 caracteres").nullable(),
  rating: z.coerce.number().min(1, "A nota do sistema deve ser de 1 até 5").max(5, "A nota do sistema deve ser de 1 até 5").nullable()
})

type EditReviewFormData = z.infer<typeof editReviewFormSchema>

export function EditReviewForm({ review, setReviews, reviews, setIsEditReviewDialogOpen }: EditReviewFormProps) {
  const [apiError, setApiError] = useState<null | string>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EditReviewFormData>({
    resolver: zodResolver(editReviewFormSchema),
    defaultValues: {
      title: review.title,
      content: review.content,
      rating: review.rating
    }
  })

  async function handleEditReview(data: EditReviewFormData) {
    try {
      const res = await api.patch(`reviews/${review.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title || undefined,
          content: data.content || undefined,
          rating: data.rating || undefined,
        })
      })
      const { review: updatedReview }: { review: IReview } = await res.json()

      const tempReviews = [...reviews]
      const editedReviewIndex = tempReviews.findIndex(item => review.id === item.id)
      tempReviews[editedReviewIndex] = updatedReview

      setReviews(tempReviews)
      setIsEditReviewDialogOpen(false)
    } catch (err) {
      setApiError('Erro ao editar review')
    }
  }

  return (
    <form className="w-full flex flex-col items-center gap-5" onSubmit={handleSubmit(handleEditReview)} >
      <div className="w-full flex flex-col gap-4" >
        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register('title')} name="title" label="Título" placeholder="Título da review" />
          {errors.title?.message && <FormError errorMessage={errors.title.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultTextArea {...register('content')} name="content" label="Conteúdo" placeholder="Conteúdo principal da review" />
          {errors.content?.message && <FormError errorMessage={errors.content.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register('rating')} name="rating" label="Nota" type="number" placeholder="Nota de 1 até 5 do sistema" />
          {errors.rating?.message && <FormError errorMessage={errors.rating.message} />}
        </div>
      </div>

      <DefaultButton text="Editar" type="submit" disabled={isSubmitting} className="mt-2 py-2 w-full disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}
    </form>
  )
}