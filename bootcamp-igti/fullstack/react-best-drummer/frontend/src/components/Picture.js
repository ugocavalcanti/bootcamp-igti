import React from 'react';
import css from "../css/picture.module.css";

export default function Picture({source, description}) {
    return (
        <div>
            <img className={css.picture} src={source} alt={description} title={description} />
        </div>
    )
}
