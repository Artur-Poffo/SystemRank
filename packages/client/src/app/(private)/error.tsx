'use client'

import { DefaultButton } from "@/components/UI/DefaultButton"
import { PageHeader } from "@/components/UI/PageHeader"
import Link from "next/link"


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-5" >
      <PageHeader title={error.name} />

      <div className="flex flex-col items-center gap-2" >
        <span className="text-3xl text-brand-green-300" >{error.message}</span>

        <div className="flex items-center gap-3" >
          <Link href={'/'} >
            <DefaultButton
              className="py-2 bg-brand-blue-700"
              text={"Voltar para a Home"}
            />
          </Link>
          <DefaultButton
            className="py-2"
            text={"Tentar novamente"}
            onClick={
              () => reset()
            }
          />
        </div>
      </div>
    </div>
  )
}