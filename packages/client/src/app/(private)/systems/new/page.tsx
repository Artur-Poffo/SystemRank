import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { verifyAuthToken } from "@/utils/verifyAuthToken";
import { verifyUserRole } from "@/utils/verifyUserRole";
import { decode as decodeJWT } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { NewSystemForm } from "./components/NewSystemForm";

export default async function NewSystem() {
  const isAuthenticated = (await verifyAuthToken()).cookie

  if (!isAuthenticated) {
    return redirect('/auth/signin')
  }

  const jwt = decodeJWT(isAuthenticated.value) as { sub: string }
  const hasUserPermission = await verifyUserRole("COMPANY", jwt.sub)

  if (!hasUserPermission) {
    return redirect('/explore')
  }

  return (
    <TransitionWrapper>
      <section id="new-system" className="flex flex-col items-center gap-10 my-16 px-4" >
        <SectionHeader text="Cadastrar sistema" />

        <NewSystemForm />
      </section>
    </TransitionWrapper>
  )
}