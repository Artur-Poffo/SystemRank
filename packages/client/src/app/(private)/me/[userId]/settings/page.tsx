import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { IUser } from "@/interfaces/IUser";
import { api } from "@/lib/ky";
import { verifyAuthToken } from "@/utils/verifyAuthToken";
import { decode as decodeJWT } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { UpdateUserForm } from "../components/UpdateUserForm";

interface UserSettingsProps {
  params: {
    userId: string
  }
}

export default async function UserSettings({ params }: UserSettingsProps) {
  const user = await getUserData(params.userId)

  async function getUserData(userId: string) {
    try {
      const res = await api.get(`users/${userId}`, {
        method: 'GET',
        cache: 'no-store'
      })
      const { user }: { user: IUser } = await res.json()

      return user
    } catch (err) {
      console.error('Erro buscando pelo usuário: ', err)
    }
  }

  const isAuthenticated = (await verifyAuthToken()).cookie

  if (!isAuthenticated) {
    return redirect('/auth/signin')
  }

  const jwt = decodeJWT(isAuthenticated.value) as { sub: string }
  const hasUserPermission = user?.id === jwt.sub

  if (!hasUserPermission) {
    return redirect('/explore')
  }

  return (
    <TransitionWrapper>
      <section id="update-user" className="flex flex-col items-center gap-10 my-16 px-4" >
        <SectionHeader text="Atualizar usuário" />

        <UpdateUserForm />
      </section>
    </TransitionWrapper>
  )
}