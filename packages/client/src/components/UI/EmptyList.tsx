import { IoMdListBox } from "react-icons/io"

interface EmptyListProps {
    text: string
}

export function EmptyList({ text }: EmptyListProps) {
    return (
        <article className="w-full flex flex-col items-center justify-center gap-2" >
            <IoMdListBox size={60} color="#778da9" />
            <span className="text-2xl font-mono font-bold text-brand-blue-600" >{text}</span>
        </article>
    )
}