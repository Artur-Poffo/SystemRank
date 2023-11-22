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

const signUpFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email({ message: 'O E-mail fornecido é inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  userRole: z.enum(['COMPANY', 'MEMBER'], { required_error: 'Esse campo é obrigatório', invalid_type_error: 'Você deve selecionar uma das opções' })
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const { SignUp } = useAuth()
  const [apiError, setApiError] = useState<null | string>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  async function handleSignUp({ name, email, password, userRole }: SignUpFormData) {
    const isCompany = userRole === "COMPANY" ? true : false

    try {
      await SignUp({
        name,
        email,
        password,
        isCompany
      })
      setApiError(null)
    } catch (err) {
      setApiError('E-mail já está em uso')
    }
  }

  return (
    <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit(handleSignUp)} >
      <div className="w-full flex flex-col gap-4" >
        <div className="flex flex-col gap-1" >
          <DefaultInput {...register("name", { required: true })} name="name" label="Nome" placeholder="Nome" />
          {errors.name?.message && <FormError errorMessage={errors.name.message} />}
        </div>

        <div className="flex flex-col gap-1" >
          <DefaultInput {...register("email")} name="email" label="E-mail" placeholder="E-mail" />
          {errors.email?.message && <FormError errorMessage={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-1" >
          <DefaultInput {...register("password")} name="password" label="Senha" placeholder="Senha" />
          {errors.password?.message && <FormError errorMessage={errors.password.message} />}
        </div>

        <div className="flex flex-col gap-2" >
          <label className="text-sm text-brand-blue-600 font-bold" >Tipo usuário:</label>

          <div className="flex items-center gap-4" >
            <div className="flex items-center gap-1" >
              <label htmlFor="normalUser">Usuário comum</label>
              <input {...register("userRole")} type="radio" className="accent-brand-green-300" name="userRole" value={"MEMBER"} />
            </div>

            <div className="flex items-center gap-1" >
              <label htmlFor="companyUser">Empresa</label>
              <input {...register("userRole")} type="radio" className="accent-brand-green-300" name="userRole" value={"COMPANY"} />
            </div>
          </div>

          {errors.userRole?.message && <FormError errorMessage={errors.userRole.message} />}
        </div>
      </div>

      <DefaultButton text="Cadastrar" type="submit" disabled={isSubmitting} className="w-full py-2 disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}

      <Link href={'/auth/signin'} className="text-sm text-brand-green-300 underline underline-offset-2 font-bold" >Já tem uma conta? Entrar</Link>
    </form>
  )
}