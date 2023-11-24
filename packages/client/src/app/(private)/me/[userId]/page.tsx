import { ISystem } from "@/interfaces/ISystem"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { verifyAuthToken } from "@/utils/verifyAuthToken"
import jwt from "jsonwebtoken"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IoMdSettings } from "react-icons/io"
import { UserProfileCard } from "./components/UserProfileCard"
import { IReview } from "@/interfaces/IReview"
import { ReviewContainer } from "@/components/UI/ReviewContainer"
import { SystemsList } from "./components/SystemsList"
import { ReviewsList } from "./components/ReviewsList"

interface UserProfileProps {
  params: {
    userId: string
  }
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { user } = await getUserData(params.userId)
  const systems = user.role === "COMPANY" ? await fetchSystemsOfCompany(params.userId) : null
  const reviews = user.role === "MEMBER" ? await fetchReviewsOfUser(params.userId) : null

  const authToken = await verifyAuthToken()
  const isTheOwner = authToken.cookie?.value ? jwt.decode(authToken.cookie.value)?.sub === user.id : false

  async function getUserData(userId: string) {
    try {
      const res = await api.get(`users/${userId}`, {
        method: 'GET'
      })
      const user: { user: IUser } = await res.json()

      return user
    } catch {
      notFound()
    }
  }

  async function fetchSystemsOfCompany(companyId: string) {
    const res = await api.get(`systems/company/${companyId}`, {
      method: 'GET',
      cache: 'no-store'
    })
    const { systems }: { systems: ISystem[] } = await res.json()

    return systems
  }

  async function fetchReviewsOfUser(userId: string) {
    const res = await api.get(`reviews/user/${userId}`, {
      method: 'GET',
      cache: 'no-store'
    })
    const { reviews }: { reviews: IReview[] } = await res.json()

    return reviews
  }

  return (
    <section id="profile" className="w-full px-4 mt-40 min-h-screen pb-10 flex flex-col xl:flex-row items-start justify-center gap-8" >
      <UserProfileCard user={user} />

      <article className="flex-1 w-full flex flex-col gap-10" >
        <header className="w-full min-h-[400px] bg-brand-gray-100 rounded-md relative" >
          <img src={user.banner_profile_image_path} alt="Imagem de banner do usuário" className="absolute top-0 left-0 w-full h-full rounded-md object-cover" />

          {isTheOwner && (
            <Link href={`/me/${user.id}/settings`} className="absolute z-10 bottom-10 right-10 rounded-full" >
              <button className="p-3 rounded-full bg-brand-gray-700 cursor-pointer" >
                <IoMdSettings />
              </button>
            </Link>
          )}
        </header>

        <main className="flex flex-col gap-14" >
          <h2 className="text-3xl text-brand-green-300 font-mono" >{user.role === "COMPANY" ? 'Sistemas da empresa' : 'Reviews recentes'}</h2>

          {user.role === "COMPANY" && systems && (
            <SystemsList systems={systems} />
          )}

          {user.role === "MEMBER" && reviews && (
            <ReviewsList reviews={reviews} />
          )}
        </main>
      </article>
    </section>
  )
}