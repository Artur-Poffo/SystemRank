import { ReactNode } from "react"

interface DefaultAsideCardProps {
  title?: string
  children: ReactNode
}

export function DefaultAsideCard({ title, children }: DefaultAsideCardProps) {
  return (
    <aside className="max-w-lg static top-32 xl:sticky w-full lg:w-auto mx-auto xl:mx-0 bg-brand-gray-600 min-w-0 md:min-w-[400px] min-h-[300px] p-4 rounded-md flex flex-col items-center xl:items-start gap-5" >
      {title && (
        <header className="w-full flex justify-center" >
          <h2 className="text-3xl text-brand-blue-600 text-center font-mono font-bold" >{title}</h2>
        </header>
      )}

      <main className="w-full flex flex-col gap-2" >
        {children}
      </main>
    </aside>
  )
}