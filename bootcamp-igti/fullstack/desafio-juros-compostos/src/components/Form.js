import React from 'react'

import css from "../css/parcela.module.css";

export default function Form(props) {

    const {montante, juros, periodo} = props;

    const handleAlteraMontante = (event) => {
        props.onChangeNumber(event.target.value, juros, periodo);
    }
    const handleAlteraJuros = (event) => {
        props.onChangeNumber(montante, event.target.value, periodo);
    }
    const handleAlteraPeriodo = (event) => {
        props.onChangeNumber(montante, juros, event.target.value);
    }

    return (
        <div className={css.flexRowForm}>
            <div className="input-field">
                <input type="number" value={montante} id="idmontante" style={{width: "270px"}}
                    min="1000" max="100000" className="validate" onChange={handleAlteraMontante} />
                <label  className="active" htmlFor="idmontante">Motante inicial</label>
            </div>
            <div className="input-field">
                <input type="number" value={juros} id="idjuros" style={{width: "270px"}}
                     min="-12" max="12" step="0.1" className="validate"  onChange={handleAlteraJuros}/>
                <label className="active" htmlFor="idjuros">Taxa de Juros (Mensal)</label>
            </div>
            <div className="input-field">
                <input type="number" value={periodo} id="idperiodo" style={{width: "270px"}}
                    min="1" max="48" className="validate" onChange={handleAlteraPeriodo} />
                <label className="active" htmlFor="idperiodo">Período (Mensal)</label>
            </div>
        </div>
    )
}
