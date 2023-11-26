import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper"
import { ReadMarkdownContainer } from "@/components/UI/ReadMarkdownContainer"
import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"
import { notFound } from "next/navigation"
import { SystemHeader } from "./components/SystemHeader"
import { SystemSummaryCard } from "./components/SystemSummary"
import { ReviewsListSection } from "./sections/Reviews"

interface SystemPageProps {
  params: {
    systemId: string
  }
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { system } = await getSystemData(params.systemId)

  async function getSystemData(systemId: string) {
    try {
      const res = await api.get(`systems/${systemId}`, {
        method: 'GET',
        cache: 'no-store'
      })
      const system: { system: ISystem } = await res.json()

      return system
    } catch {
      notFound()
    }
  }

  return (
    <TransitionWrapper>
      <section id="system-info" className="flex flex-col gap-20" >
        <SystemHeader system={system} />

        <main className="w-full px-4 min-h-screen pb-10 flex flex-col xl:flex-row items-start justify-center gap-8" >
          <SystemSummaryCard system={system} />

          <article className="w-full flex-1" >
            <ReadMarkdownContainer>
              {system.content}
            </ReadMarkdownContainer>
          </article>
        </main>
      </section>

      <ReviewsListSection systemId={params.systemId} />
    </TransitionWrapper>
  )
}