'use client'

import { DefaultButton } from "@/components/UI/DefaultButton";
import { DefaultInput } from "@/components/UI/DefaultInput";
import { DefaultTextArea } from "@/components/UI/DefaultTextArea";
import { FormError } from "@/components/UI/FormError";
import { FormLabel } from "@/components/UI/FormLabel";
import { MdEditor } from "@/components/UI/MdEditor";
import { ISystem } from "@/interfaces/ISystem";
import { api } from "@/lib/ky";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateSystemFormProps {
  system: ISystem
}

const updateSystemFormSchema = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
  content: z.string(),
  systemPageLink: z.string().nullable(),
  systemLogoImagePath: z.string().nullable(),
  systemCoverImagePath: z.string().nullable(),
})

export type UpdateSystemFormData = z.infer<typeof updateSystemFormSchema>

export function UpdateSystemForm({ system }: UpdateSystemFormProps) {
  const [apiError, setApiError] = useState<null | string>(null)
  const router = useRouter()

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<UpdateSystemFormData>({
    resolver: zodResolver(updateSystemFormSchema),
    defaultValues: {
      name: system.name,
      content: system.content,
      description: system.description,
      systemPageLink: system.system_page_link,
      systemCoverImagePath: system.system_cover_image_path,
      systemLogoImagePath: system.system_logo_image_path
    },
  })

  async function handleUpdateSystem(data: UpdateSystemFormData) {
    try {
      await api.patch(`systems/${system.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: data.name || undefined,
          content: data.content || undefined,
          description: data.description || undefined,
          systemPageLink: data.systemPageLink || undefined,
          systemCoverImagePath: data.systemCoverImagePath || undefined,
          systemLogoImagePath: data.systemLogoImagePath || undefined,
        })
      })
      setApiError(null)

      await router.push(`/systems/${system.id}`)
      await router.refresh()
    } catch (err) {
      setApiError('Erro ao atualizar sistema')
    }
  }

  return (
    <form className="w-full max-w-xl flex flex-col items-center gap-4" onSubmit={handleSubmit(handleUpdateSystem)} >
      <div className="w-full flex flex-col gap-4" >
        <div className="w-full flex flex-col gap-1" >
          <DefaultInput {...register("name")} name="name" label="Nome*" placeholder="Nome do sistema" />
          {errors.name?.message && <FormError errorMessage={errors.name.message} />}
        </div>

        <div className="w-full flex flex-col gap-1" >
          <DefaultTextArea {...register("description")} name="description" label="Descrição*" placeholder="Descrição curta sobre o sistema " />
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

      <DefaultButton text="Atualizar sistema" type="submit" disabled={isSubmitting} className="mt-2 w-full py-2 disabled:opacity-80" />

      {apiError && <FormError errorMessage={apiError} />}
    </form>
  )
}