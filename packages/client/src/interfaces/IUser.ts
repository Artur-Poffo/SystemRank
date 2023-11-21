export interface IUser {
    id: string
    name: string
    email: string
    profile_image_path?: string
    banner_profile_image_path?: string
    role: "MEMBER" | "COMPANY"
}