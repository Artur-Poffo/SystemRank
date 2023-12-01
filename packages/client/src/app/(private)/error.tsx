'use client'

import { DefaultButton } from "@/components/UI/DefaultButton"
import { PageHeader } from "@/components/UI/PageHeader"


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
        <span>{error.message}</span>

        <DefaultButton
          text={"Tentar novamente"}
          onClick={
            () => reset()
          }
        />
      </div>
    </div>
  )
}