import Image from "next/image"
import { ReactNode } from "react"

interface AuthPageTemplateProps {
  children: ReactNode
  title: string
  backgroundImagePath: string
}

export function AuthPageTemplate({ children, title, backgroundImagePath }: AuthPageTemplateProps) {
  return (
    <section id="#auth" className="w-full h-screen flex items-center justify-center xl:items-start xl:justify-end relative px-5 xl:px-0" >
      <div className="absolute top-0 left-0 w-full h-full opacity-60" >
        <Image src={backgroundImagePath} alt="Imagem de fundo" className="w-full h-full object-cover" width={1920} height={1280} />
      </div>

      <div className="w-full md:max-w-[500px] xl:max-w-none xl:w-1/4 xl:h-full bg-brand-blue-900 px-4 py-10 flex flex-col items-center gap-4 z-10 shadow-2xl shadow-brand-gray-900 rounded-sm" >
        <h1 className="text-3xl text-brand-blue-600 font-mono font-bold" >{title}</h1>

        {children}
      </div>
    </section>
  )
}