import React from 'react'
import Name from './Name'
import Votes from './Votes'
import Percentage from './Percentage'
import Popularity from './Popularity';
import { formatNumber, formatPercentage } from '../helpers/formatterHelper';

export default function Info({candidate}) {
    const {name, votes, percentage, popularity, previousVote, previousPercentage} = candidate;
    return (
        <div>
            <Name>{name}</Name>
            <Votes votes={votes} previous={previousVote} />
            <Percentage percentage={percentage} previous={previousPercentage} />
            <Popularity>{popularity}</Popularity>
        </div>
    )
}
