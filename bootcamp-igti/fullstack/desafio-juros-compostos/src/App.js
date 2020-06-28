import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Installments from './components/Installments';

export default function App() {
  const [montante, setMontante] = useState(1000);
  const [juros, setJuros] = useState(0.5);
  const [periodo, setPeriodo] = useState(1);
  const [parcelas, setParcelas] = useState([]);

  useEffect(() => {
    let array = [];
    array.push({
        valor: montante* (1 + (juros/100)),
        acrescimo: montante * (juros/100),
        percentual: ((montante * (juros/100)) / montante) * 100
    });
    for (let i = 1; i < periodo; i++) {
      const valor = array[i-1].valor;
      const acrescimo = array[i-1].acrescimo;
      const percentual = array[i-1].percentual;

      let parcela = {
        valor: valor * (1 + (juros/100)),
        acrescimo: acrescimo + (valor * (juros/100)),
        percentual: percentual + ((valor * (juros/100)) / montante) * 100
      }

      array.push(parcela);
    }

    setParcelas(array);
  }, [montante, juros, periodo]);

  const handleCalculaParcelas = (montante, juros, periodo) => {
    setMontante(montante);
    setJuros(juros);
    setPeriodo(periodo);
  }

  return (
  <div className="container">
    <h1 style={{textAlign: "center"}}>React - Juros Compostos</h1>
    <Form montante={montante} juros={juros} periodo={periodo} onChangeNumber={handleCalculaParcelas} />
    <Installments parcelas={parcelas} />
  </div>
  )
}
