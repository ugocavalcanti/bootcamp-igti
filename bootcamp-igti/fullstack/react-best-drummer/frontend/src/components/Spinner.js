import React from 'react'

export default function Spinner() {
    return (
        <div>
            <div>Searching candidates...</div>
            <div className="progress">
            <div className="indeterminate"></div>
            </div>
        </div>
    )
}
