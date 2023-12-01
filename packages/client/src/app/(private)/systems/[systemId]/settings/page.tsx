import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { getSystemData } from "@/server-functions/getSystemData";
import { verifyAuthToken } from "@/utils/verifyAuthToken";
import { decode as decodeJWT } from "jsonwebtoken";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UpdateSystemForm } from "../components/UpdateSystemForm";

interface SystemSettingsProps {
  params: {
    systemId: string
  }
}

export const metadata: Metadata = {
  title: 'SystemRank | Editar sistema',
  description: 'Atualize as informações do seu sistema operacional para chamar mais atenção',
}

export default async function SystemSettings({ params }: SystemSettingsProps) {
  const { system } = await getSystemData(params.systemId)

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