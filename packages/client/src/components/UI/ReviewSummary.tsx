import { ISystem } from "@/interfaces/ISystem";
import { api } from "@/lib/ky";
import Link from "next/link";
import { DefaultCard } from "./DefaultCard";
import { Rating } from "./Rating";

interface ReviewSummaryProps {
    reviewTitle: string
    reviewContent: string
    rating: number
    reviewId: string
    systemId: string
}

export async function ReviewSummary({ reviewTitle, reviewContent, rating, reviewId, systemId }: ReviewSummaryProps) {
    const res = await api.get(`systems/${systemId}`, {
        method: 'GET'
    })
    const { system }: { system: ISystem } = await res.json()

    return (
        <Link href={`/systems/${systemId}/#review-${reviewId}`} scroll={false} >
            <DefaultCard className="md:w-80 p-4 bg-brand-gray-600 rounded-md flex flex-col gap-2" >
                <header>
                    <h2 className="text-xl text-brand-green-200 font-mono font-bold" >{system.name}</h2>
                    <Rating iconSize={20} selectedValue={rating} />
                </header>

                <main className="flex flex-col gap-1" >
                    <h3 className="text-lg text-brand-gray-100" >{reviewTitle}</h3>
                    <p className="line-clamp-1" >{reviewContent}</p>
                </main>
            </DefaultCard>
        </Link>
    )
}