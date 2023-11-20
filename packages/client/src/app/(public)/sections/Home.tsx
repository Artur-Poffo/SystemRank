import TuxHomeImage from "@/../public/images/tux-home-image.png";
import { DefaultButton } from "@/components/UI/DefaultButton";
import Image from "next/image";

export function HomeSection() {
  return (
    <section id="#home" className="w-full min-h-screen flex flex-col xl:flex-row items-center justify-center px-4 pt-20 xl:pt-0" >
      <div className="flex flex-col gap-2 max-w-xl pb-12" >
        <h1 className="text-3xl xl:text-4xl text-brand-green-300 font-mono font-bold" >Explore o mundo dos Sistemas Operacionais e se surpreenda</h1>
        <p className="text-sm" >Descubra novos sistemas operacionais e veja reviews dos que já conhece</p>
        <DefaultButton text="Saiba Mais" link="/#about" className="w-full" />
      </div>

      <Image src={TuxHomeImage} width={400} height={400} alt="Imagem do Tux o mascote do Linux" className="w-[400px] rotate-0 md:-rotate-12 transition-all hover:-translate-y-6" />
    </section>
  )
}