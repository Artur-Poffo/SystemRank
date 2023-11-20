import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { DefaultCard } from "./DefaultCard";

interface SystemCardProps {
  animationDelay?: number
  skeleton?: boolean
}

export function SystemCard({ animationDelay, skeleton }: SystemCardProps) {
  return (
    skeleton ? (
      <DefaultCard animationDelay={animationDelay} className="bg-transparent w-full md:w-[330px] min-h-[200px] md:min-h-[330px] rounded-md border border-brand-green-300 flex flex-col items-center justify-center gap-2" >
        <FaArrowRightLong size={32} color={'#2a9134'} />
        <span className="text-sm text-brand-green-300" >Explorar</span>
      </DefaultCard>
    ) : (
      <Link href={'/'} >
        <DefaultCard animationDelay={animationDelay} className="bg-brand-gray-600 w-full md:w-[330px] min-h-[200px] md:min-h-[330px] flex flex-col items-center gap-4 px-5 pb-5 rounded-md" >
          <header className="flex flex-col items-center gap-2 -mt-7" >
            <img src="data:image/png;base64,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" alt="Logo do sistema operacional" width={80} height={80} />
            <h2 className="text-lg font-bold font-mono text-brand-blue-600" >Ubuntu 22.04</h2>
          </header >

          <main>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus possimus nisi eaque nulla ipsum cumque voluptate alias velit, perspiciatis dignissimos atque molestias aut iste repellat ea explicabo, sit temporibus nam!
          </main>
        </DefaultCard >
      </Link>
    )
  )
}