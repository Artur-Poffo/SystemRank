'use client'

import { DefaultButton } from "@/components/UI/DefaultButton";
import { DefaultInput } from "@/components/UI/DefaultInput";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function SignInForm() {
  const { SignIn } = useAuth()
  
  async function handleSignIn() {
    await SignIn({email: 'test@hotmail.com', password: '123456'})
  }

  return (
    <form className="w-full flex flex-col items-center gap-4" method="POST" onSubmit={(e) => e.preventDefault()} >
      <div className="w-full flex flex-col gap-4" >
        <div className="flex flex-col gap-1" >
          <DefaultInput name="email" label="E-mail" placeholder="E-mail" required />
        </div>

        <div className="flex flex-col gap-1" >
          <DefaultInput name="password" label="Senha" placeholder="Senha" required />
        </div>
      </div>

      <DefaultButton text="Entrar" type="submit" className="w-full py-2" onClick={handleSignIn} />

      <Link href={'/auth/signup'} className="text-sm text-brand-green-300 underline underline-offset-2 font-bold" >Não tem um conta? Cadastre-se</Link>
    </form>
  )
}