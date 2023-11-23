interface PageHeaderProps {
    title: string
}

export function PageHeader({ title }: PageHeaderProps) {
    return (
        <header className="w-full h-[300px] lg:h-[500px] flex items-center justify-center bg-[url('/images/page-header-image.jpg')] bg-cover opacity-70" >
            <h1 className="text-4xl text-center text-brand-gray-100 font-mono font-bold uppercase tracking-wider" >{title}</h1>
        </header>
    )
}