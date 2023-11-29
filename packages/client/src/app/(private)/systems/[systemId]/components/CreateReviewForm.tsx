'use client'

import { DefaultButton } from "@/components/UI/DefaultButton"
import { DefaultInput } from "@/components/UI/DefaultInput"
import { DefaultTextArea } from "@/components/UI/DefaultTextArea"
import { FormError } from "@/components/UI/FormError"
import { IReview } from "@/interfaces/IReview"
import { api } from "@/lib/ky"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface CreateReviewFormProps {
  systemId: string
  setReviews: (reviews: IReview[]) => void
  setIsCreateReviewDialogOpen: (setIsCreateReviewDialogOpen: boolean) => void
}

const createReviewFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  content: z.string().min(5, "O conteúdo da review deve ter pelo menos 5 caracteres"),
  rating: z.coerce.number().min(1, "A nota do sistema deve ser de 1 até 5").max(5, "A nota do sistema deve ser de 1 até 5")
})

type CreateReviewFormData = z.infer<typeof createReviewFormSchema>

export function CreateReviewForm({ systemId, setReviews, setIsCreateReviewDialogOpen }: CreateReviewFormProps) {
  const [apiError, setApiError] = useState<null | string>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateReviewFormData>({
    resolver: zodResolver(createReviewFormSchema),
    defaultValues: {
      rating: 1
    }
  })

  async function handleCreateReview(data: CreateReviewFormData) {
    try {
      await api.post(`reviews/system/${systemId}`, {
        method: 'POST',
        body: JSON.stringify(data)
      })

      api.get(`reviews/system/${systemId}`, {
        method: 'GET',
        cache: 'no-store'
      })
        .then(res => res.json() as unknown as { reviews: IReview[] })
        .then(data => setReviews(data.reviews))

      setIsCreateReviewDialogOpen(false)
      setApiError(null)
    } catch (err) {
      setApiError("Erro ao criar review")
    }
  }

  return (
    <form className="w-full flex flex-col items-center gap-5" onSubmit={handleSubmit(handleCreateReview)}>
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

      <DefaultButton text="Cadastrar" type="submit" disabled={isSubmitting} className="mt-2 py-2 w-full disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}
    </form>
  )
}