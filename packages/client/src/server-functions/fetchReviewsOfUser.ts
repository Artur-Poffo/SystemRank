import { IReview } from "@/interfaces/IReview"
import { api } from "@/lib/ky"

export async function fetchReviewsOfUser(userId: string) {
  try {
    const res = await api.get(`reviews/user/${userId}`, {
      method: 'GET',
      cache: 'no-store'
    })
  
    const { reviews }: { reviews: IReview[] } = await res.json()
  
    return reviews
  } catch (err) {
    throw new Error("Erro ao buscar reviews do usuário")
  }
}