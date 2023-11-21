export interface ISystem {
    id: string
    name: string
    description: string
    content: string
    system_page_link?: string
    system_logo_image_path?: string
    system_cover_image_path?: string
    created_at: Date
    user_id: string
}