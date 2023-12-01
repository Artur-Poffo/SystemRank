import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper"
import { ReadMarkdownContainer } from "@/components/UI/ReadMarkdownContainer"
import { getSystemData } from "@/server-functions/getSystemData"
import { verifyAuthToken } from "@/utils/verifyAuthToken"
import jwt from "jsonwebtoken"
import { Metadata } from "next"
import { SystemHeader } from "./components/SystemHeader"
import { SystemSummaryCard } from "./components/SystemSummary"
import { ReviewsListSection } from "./sections/Reviews"

interface SystemPageProps {
  params: {
    systemId: string
  }
}

export const metadata: Metadata = {
  title: 'SystemRank | Sistema',
  description: 'Visualize informações dos sistemas operacionais',
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { system } = await getSystemData(params.systemId)

  const authToken = await verifyAuthToken()
  const isTheOwner = authToken.cookie?.value ? jwt.decode(authToken.cookie.value)?.sub === system.user_id : false

  return (
    <TransitionWrapper>
      <section id="system-info" className="flex flex-col gap-20" >
        <SystemHeader system={system} isTheOwner={isTheOwner} />

        <main className="w-full px-4 min-h-screen pb-10 flex flex-col xl:flex-row items-start justify-center gap-8" >
          <SystemSummaryCard system={system} />

          <article className="w-full flex-1" >
            <ReadMarkdownContainer>
              {system.content}
            </ReadMarkdownContainer>
          </article>
        </main>
      </section>

      <ReviewsListSection systemId={params.systemId} isTheOwner={isTheOwner} />
    </TransitionWrapper>
  )
}