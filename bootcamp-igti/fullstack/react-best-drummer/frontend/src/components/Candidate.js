import React from 'react'
import Position from './Position';
import Picture from './Picture';
import Info from './Info';

import css from "../css/candidate.module.css";

export default function Candidate({candidate, position}) {
    const {id, name } = candidate;

    const sourceImage = `/img/${id}.jpg`
    return (
        <div className={css.candidate}>
            <Position position={position} />
            <Picture source={sourceImage} description={name} />
            <Info candidate={candidate} />
        </div>
    )
}
