'use client'

import { DefaultButton } from "@/components/UI/DefaultButton";
import { DefaultInput } from "@/components/UI/DefaultInput";
import { FormError } from "@/components/UI/FormError";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z.string().email({ message: 'O E-mail fornecido é inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const { SignIn } = useAuth()
  const [apiError, setApiError] = useState<null | string>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema)
  })

  async function handleSignIn(data: SignInFormData) {
    try {
      await SignIn(data)
      setApiError(null)
    } catch (err) {
      setApiError('Credenciais inválidas')
    }
  }

  return (
    <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit(handleSignIn)} >
      <div className="w-full flex flex-col gap-4" >
        <div className="flex flex-col gap-1" >
          <DefaultInput {...register("email")} name="email" label="E-mail" placeholder="E-mail" />
          {errors.email?.message && <FormError errorMessage={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-1" >
          <DefaultInput {...register("password")} name="password" label="Senha" placeholder="Senha" />
          {errors.password?.message && <FormError errorMessage={errors.password.message} />}
        </div>
      </div>

      <DefaultButton text="Entrar" type="submit" disabled={isSubmitting} className="w-full py-2 disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}

      <Link href={'/auth/signup'} className="text-sm text-brand-green-300 underline underline-offset-2 font-bold" >Não tem um conta? Cadastre-se</Link>
    </form>
  )
}