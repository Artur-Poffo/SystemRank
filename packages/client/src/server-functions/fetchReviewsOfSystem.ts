import { IReview } from "@/interfaces/IReview"
import { api } from "@/lib/ky"

export async function fetchReviewsOfSystem(systemId: string) {
  const res = await api.get(`reviews/system/${systemId}`, {
    method: 'GET',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar reviews do sistema")
  }

  const { reviews }: { reviews: IReview[] } = await res.json()

  return reviews
}