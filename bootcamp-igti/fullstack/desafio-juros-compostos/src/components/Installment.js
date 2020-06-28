import React from 'react'

import css from "../css/parcela.module.css";

export default function Installment({parcela, indice}) {
    return (
        <div className={`${css.flexRow} ${css.parcela}`}>
            <div style={{marginRight: "10px", fontWeight: "bold"}}>
                {indice}
            </div>
            <div>
                <div className={`${parcela.acrescimo >= 0 ? css.green : css.red}`}>
                    R$ {parcela.valor.toFixed(2)}
                </div>
                <div className={`${parcela.acrescimo >= 0 ? css.green : css.red}`}>
                    R$ {parcela.acrescimo.toFixed(2)}
                </div>
                <div className={`${parcela.acrescimo >= 0 ? css.blue : css.orange}`}>
                    {parcela.percentual.toFixed(2)}%
                </div>
            </div>
        </div>
    )
}
