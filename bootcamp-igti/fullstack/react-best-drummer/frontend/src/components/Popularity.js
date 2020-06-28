import React from 'react'

const STARS = {
    empty: "☆",
    full: "★"
}

const MAX_STARS = 10;

export default function Popularity({children}) {
    const fullstars = STARS.full.repeat(children);
    const emptystars = STARS.empty.repeat(MAX_STARS - children);
    return (
        <div style={{fontSize: '1.5rem', color: '#f39c12'}}>
            {fullstars}
            {emptystars}
        </div>
    )
}
