import BgImage from "@/../public/images/page-header-image.jpg"
import Image from "next/image"

interface PageHeaderProps {
    title: string
}

export function PageHeader({ title }: PageHeaderProps) {
    return (
        <header className="w-full h-[300px] lg:h-[500px] flex items-center justify-center relative" >
            <Image src={BgImage} alt="Imagem de fundo" className="absolute top-0 left-0 w-full h-full object-cover opacity-90" />

            <h1 className="text-4xl text-center py-2 px-5 text-brand-green-300 bg-brand-gray-900 font-mono font-bold uppercase tracking-wider z-[1]" >{title}</h1>
        </header>
    )
}