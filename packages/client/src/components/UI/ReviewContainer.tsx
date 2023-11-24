'use client'

import { DefaultCard } from "./DefaultCard";
import { Rating } from "./Rating";

interface ReviewContainerProps {
    name: string
    content: string
}

export function ReviewContainer({ name, content }: ReviewContainerProps) {
    return (
        <DefaultCard>
            <header>
                <h2>{name}</h2>
                <Rating iconSize={30} />
            </header>

            <main>
                {content}
            </main>
        </DefaultCard>
    )
}