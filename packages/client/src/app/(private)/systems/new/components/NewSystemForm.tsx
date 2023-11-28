'use client'

import { DefaultButton } from "@/components/UI/DefaultButton"
import { DefaultInput } from "@/components/UI/DefaultInput"
import { FormError } from "@/components/UI/FormError"
import { FormLabel } from "@/components/UI/FormLabel"
import { MdEditor } from "@/components/UI/MdEditor"
import { api } from "@/lib/ky"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const registerSystemFormSchema = z.object({
  name: z.string().min(3, "O nome do sistema deve ter pelo menos 3 caracteres"),
  description: z.string().min(1, "Campo obrigatório"),
  content: z.string().min(1, "Campo obrigatório"),
  systemPageLink: z.string().nullable(),
  systemLogoImagePath: z.string().nullable(),
  systemCoverImagePath: z.string().nullable(),
})

type RegisterSystemFormData = z.infer<typeof registerSystemFormSchema>

export function NewSystemForm() {
  const [apiError, setApiError] = useState<null | string>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useForm<RegisterSystemFormData>({
    resolver: zodResolver(registerSystemFormSchema),
    defaultValues: {
      name: '',
      description: '',
      content: '',
      systemPageLink: null,
      systemLogoImagePath: null,
      systemCoverImagePath: null,
    },
  })
  const router = useRouter()

  async function handleRegisterSystem(data: RegisterSystemFormData) {
    console.log(data)

    try {
      await api.post('systems', {
        method: "POST",
        body: JSON.stringify({
          ...data,
          systemPageLink: data.systemPageLink || undefined,
          systemLogoImagePath: data.systemLogoImagePath || undefined,
          systemCoverImagePath: data.systemCoverImagePath || undefined,
        })
      })
      setApiError(null)

      await router.push('/explore')
    } catch (err) {
      setApiError('Sistema com mesmo nome já existe')
    }
  }

  return (
    <form className="w-full max-w-xl flex flex-col items-center gap-4" onSubmit={handleSubmit(handleRegisterSystem)} >
      <div className="w-full flex flex-col gap-4" >
        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("name")} name="name" label="Nome*" placeholder="Nome do sistema" />
          {errors.name?.message && <FormError errorMessage={errors.name.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("description")} name="description" label="Descrição*" placeholder="Descrição curta sobre o sistema " />
          {errors.description?.message && <FormError errorMessage={errors.description.message} />}
        </div>

        <div className="w-full flex-col gap-1" >
          <FormLabel htmlFor="content" text="Conteúdo da página do sistema" />
          <Controller
            name="content"
            control={control}
            render={({ field }) => <MdEditor {...field} />}
          />
          {errors.content?.message && <FormError errorMessage={errors.content.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("systemLogoImagePath")} name="systemLogoImagePath" label="Caminho para logo do sistema" placeholder="Caminho para logo do sistema" />
          {errors.systemLogoImagePath?.message && <FormError errorMessage={errors.systemLogoImagePath.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("systemCoverImagePath")} name="systemCoverImagePath" label="Caminho para imagem de fundo do sistema" placeholder="Caminho para imagem de fundo do sistema" />
          {errors.systemCoverImagePath?.message && <FormError errorMessage={errors.systemCoverImagePath.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("systemPageLink")} name="systemPageLink" label="Link para o site do sistema" placeholder="Link para o site do sistema" />
          {errors.systemPageLink?.message && <FormError errorMessage={errors.systemPageLink.message} />}
        </div>
      </div>

      <DefaultButton text="Cadastrar" type="submit" disabled={isSubmitting} className="mt-2 w-full py-2 disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}
    </form>
  )
}