import React from 'react'
import css from "../css/position.module.css";
export default function Position({position}) {
    return (
        <div className={css.position}>
            {position}
        </div>
    )
}
