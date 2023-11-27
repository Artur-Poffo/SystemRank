import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { ISystem } from "@/interfaces/ISystem";
import { api } from "@/lib/ky";
import { verifyAuthToken } from "@/utils/verifyAuthToken";
import { decode as decodeJWT } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { UpdateSystemForm } from "../components/UpdateSystemForm";

interface SystemSettingsProps {
  params: {
    systemId: string
  }
}

export default async function SystemSettings({ params }: SystemSettingsProps) {
  const system = await getSystemData(params.systemId)

  async function getSystemData(systemId: string) {
    try {
      const res = await api.get(`systems/${systemId}`, {
        method: 'GET',
        cache: 'no-store'
      })
      const { system }: { system: ISystem } = await res.json()

      return system
    } catch (err) {
      console.error('Erro buscando pelo sistema: ', err)
    }
  }

  const isAuthenticated = (await verifyAuthToken()).cookie

  if (!isAuthenticated) {
    return redirect('/auth/signin')
  }

  const jwt = decodeJWT(isAuthenticated.value) as { sub: string }
  const hasUserPermission = system?.user_id === jwt.sub

  if (!hasUserPermission) {
    return redirect('/explore')
  }

  return (
    <TransitionWrapper>
      <section id="update-system" className="flex flex-col items-center gap-10 my-16 px-4" >
        <SectionHeader text="Atualizar sistema" />

        <UpdateSystemForm system={system} />
      </section>
    </TransitionWrapper>
  )
}