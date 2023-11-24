import Link from "next/link";
import { FaArrowRightLong, FaComputer } from "react-icons/fa6";
import { DefaultCard } from "./DefaultCard";

interface SystemCardProps {
  id?: string
  name?: string
  logoUrl?: string
  description?: string
  animationDelay?: number
  skeleton?: boolean
}

export function SystemCard({ id, name, description, logoUrl, animationDelay, skeleton }: SystemCardProps) {
  return (
    skeleton ? (
      <DefaultCard animationDelay={animationDelay} className="bg-transparent w-full md:w-[330px] min-h-[200px] md:min-h-[330px] rounded-md border border-brand-green-300 flex flex-col items-center justify-center gap-2" >
        <FaArrowRightLong size={32} color={'#2a9134'} />
        <span className="text-sm text-brand-green-300" >Explorar</span>
      </DefaultCard>
    ) : (
      <Link href={`/systems/${id}`} >
        <DefaultCard animationDelay={animationDelay} className="bg-brand-gray-600 w-full md:w-[330px] min-h-[200px] md:min-h-[330px] flex flex-col items-center gap-4 px-5 pb-5 rounded-md" >
          <header className="flex flex-col items-center gap-2 -mt-7" >
            <div className={`w-20 h-20 text-center flex items-center justify-center`} >
              {logoUrl ? (
                <img src={logoUrl} alt="Logo do sistema operacional" className="w-full h-full" />
              ) : (
                <FaComputer size={80} />
              )}
            </div>
            <h2 className="text-lg font-bold font-mono text-brand-green-200" >{name}</h2>
          </header >

          <main>
            <p>{description}</p>
          </main>
        </DefaultCard >
      </Link>
    )
  )
}