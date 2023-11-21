export interface IReview {
    id: string
    title: string
    content: string
    rating: number
    created_at: Date
    user_id: string
    system_id: string
}