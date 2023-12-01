import { IReview } from "@/interfaces/IReview"
import { api } from "@/lib/ky"

export async function fetchReviewsOfUser(userId: string) {
  const res = await api.get(`reviews/user/${userId}`, {
    method: 'GET',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar reviews do usuário")
  }

  const { reviews }: { reviews: IReview[] } = await res.json()

  return reviews
}