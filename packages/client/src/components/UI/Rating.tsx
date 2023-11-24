'use client'

import ReactStars from 'react-stars'

interface RatingProps {
    iconSize: number
}

export function Rating({ iconSize }: RatingProps) {
    return (
        <ReactStars
            count={5}
            half={false}
            size={iconSize}
            color2={'#ffd700'}
        /> 
    )
}