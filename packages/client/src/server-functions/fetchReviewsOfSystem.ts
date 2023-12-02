import { IReview } from "@/interfaces/IReview"
import { api } from "@/lib/ky"

export async function fetchReviewsOfSystem(systemId: string) {
  try {
    const res = await api.get(`reviews/system/${systemId}`, {
      method: 'GET',
      cache: 'no-store'
    })
  
    const { reviews }: { reviews: IReview[] } = await res.json()
  
    return reviews
  } catch (err) {
    throw new Error("Erro ao buscar reviews do sistema")
  }
}