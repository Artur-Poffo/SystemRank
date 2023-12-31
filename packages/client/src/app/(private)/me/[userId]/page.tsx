import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper"
import { DefaultSubTitle } from "@/components/UI/DefaultSubTitle"
import { fetchReviewsOfUser } from "@/server-functions/fetchReviewsOfUser"
import { fetchSystemsOfCompany } from "@/server-functions/fetchSystemsOfCompany"
import { getUserData } from "@/server-functions/getUserData"
import { verifyAuthToken } from "@/utils/verifyAuthToken"
import jwt from "jsonwebtoken"
import { Metadata } from "next"
import { ReviewsList } from "./components/ReviewsList"
import { SystemsList } from "./components/SystemsList"
import { UserBanner } from "./components/UserBanner"
import { UserProfileCard } from "./components/UserProfileCard"

interface UserProfileProps {
  params: {
    userId: string
  }
}

export const metadata: Metadata = {
  title: 'SystemRank | Perfil',
  description: 'Visualize o seu e o perfil de outros usuários',
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { user } = await getUserData(params.userId)

  const systems = user.role === "COMPANY" ? await fetchSystemsOfCompany(params.userId) : null
  const reviews = user.role === "MEMBER" ? await fetchReviewsOfUser(params.userId) : null

  const authToken = await verifyAuthToken()
  const isTheOwner = authToken.cookie?.value ? jwt.decode(authToken.cookie.value)?.sub === user.id : false

  return (
    <TransitionWrapper>
      <section id="profile" className="w-full px-4 mt-40 min-h-screen pb-10 flex flex-col xl:flex-row items-start justify-center gap-8" >
        <UserProfileCard user={user} />

        <article className="flex-1 w-full flex flex-col gap-10" >
          <UserBanner userId={user.id} bannerImagePath={user.banner_profile_image_path} isTheOwner={isTheOwner} />

          <main className="flex flex-col gap-14" >
            {user.role === "COMPANY" ? (
              <DefaultSubTitle text="Sistemas da empresa" />
            ) : (
              <DefaultSubTitle text="Reviews recentes" />
            )}

            {user.role === "COMPANY" && systems && (
              <SystemsList systems={systems} />
            )}

            {user.role === "MEMBER" && reviews && (
              <ReviewsList reviews={reviews} />
            )}
          </main>
        </article>
      </section>
    </TransitionWrapper>
  )
}