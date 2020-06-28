import React from 'react'
import Installment from './Installment'

import css from "../css/parcela.module.css";

export default function Installments({parcelas}) {
    return (
        <div className={css.flexRow}>
        {parcelas.map((item, index) =>{
            return (
                <Installment key={index} className="parcela" parcela={item} indice={index+1}/>
            )
        })}
        </div>
    )
}
