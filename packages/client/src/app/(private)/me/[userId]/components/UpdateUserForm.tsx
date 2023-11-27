'use client'

import { DefaultButton } from "@/components/UI/DefaultButton";
import { DefaultInput } from "@/components/UI/DefaultInput";
import { FormError } from "@/components/UI/FormError";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateUserFormSchema = z.object({
  name: z.string().nullable(),
  email: z.string().email("E-mail inválido").nullable(),
  profileImagePath: z.string().nullable(),
  bannerProfileImagePath: z.string().nullable()
})

export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>

export function UpdateUserForm() {
  const [apiError, setApiError] = useState<null | string>(null)
  const { user, UpdateUser } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      profileImagePath: user?.profile_image_path,
      bannerProfileImagePath: user?.banner_profile_image_path,
    },
  })

  async function handleUpdateUser(data: UpdateUserFormData) {
    try {
      await UpdateUser(data)
      setApiError(null)
    } catch (err) {
      setApiError("Erro ao atualizar o usuário")
    }
  }

  return (
    <form className="w-full max-w-xl flex flex-col items-center gap-4" onSubmit={handleSubmit(handleUpdateUser)} >
      <div className="w-full flex flex-col gap-4" >
        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("name")} name="name" label="Nome" placeholder="Nome" />
          {errors.name?.message && <FormError errorMessage={errors.name.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("email")} name="email" label="E-mail" placeholder="E-mail" />
          {errors.email?.message && <FormError errorMessage={errors.email.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("profileImagePath")} name="profileImagePath" label="Imagem do perfil" placeholder="Endereço da imagem de perfil" />
          {errors.profileImagePath?.message && <FormError errorMessage={errors.profileImagePath.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("bannerProfileImagePath")} name="bannerProfileImagePath" label="Imagem do Banner" placeholder="Endereço da imagem do Banner" />
          {errors.bannerProfileImagePath?.message && <FormError errorMessage={errors.bannerProfileImagePath.message} />}
        </div>
      </div>

      <DefaultButton text="Atualizar usuário" type="submit" disabled={isSubmitting} className="mt-2 w-full py-2 disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}
    </form>
  )
}