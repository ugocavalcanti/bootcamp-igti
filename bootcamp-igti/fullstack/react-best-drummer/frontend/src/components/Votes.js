import React from 'react'

import CountUp from 'react-countup';

export default function Votes({votes, previous}) {
    return (
        <div>
            <CountUp
                start={previous}
                end={votes}
                duration={0.6}
                separator="."
                >
                {({ countUpRef }) => (
                    <div>
                    <span ref={countUpRef} />
                    </div>
                )}
            </CountUp>
        </div>
    )
}
