'use client'

import ReactStars from 'react-stars'

interface RatingProps {
    iconSize: number
    editable?: boolean
    selectedValue?: number
}

export function Rating({ iconSize, editable = true, selectedValue }: RatingProps) {
    return (
        <ReactStars
            count={5}
            half={false}
            edit={editable}
            value={selectedValue}
            size={iconSize}
            color2={'#ffd700'}
        />
    )
}