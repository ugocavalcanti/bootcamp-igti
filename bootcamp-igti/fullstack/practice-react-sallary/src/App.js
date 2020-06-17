import React, { Component } from 'react';
import InputNumber from './components/InputNumber';
import InputReadOnly from './components/InputReadOnly';
import BarSalary from './components/Bar';

import { calculateINSS, calculateIRPF } from "./helpers/helpers"
import css from "./css/bar.module.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000
    }
  }

  calculateSalary() {
    let { fullSalary } = this.state;
    
    this.totalSalary = fullSalary;
    this.totalSalary === "" ?  this.baseSalaryINSS = 0 : this.baseSalaryINSS = parseFloat(this.totalSalary);
    this.contributionINSS = calculateINSS(this.baseSalaryINSS);
    this.baseSalaryIRPF = this.baseSalaryINSS - this.contributionINSS;
    this.contributionIRPF = calculateIRPF(this.baseSalaryIRPF);
    this.liquidSalary = this.baseSalaryIRPF - this.contributionIRPF;

    /* Percents */

    if (this.totalSalary === ""){ // protection against NaN
      this.percentIRPF = 0;
      this.percentINSS = 0;
      this.percentLiquidSalary = 0;
    }else {
      this.percentIRPF = (this.contributionIRPF / this.totalSalary) * 100;
      this.percentINSS = (this.contributionINSS / this.totalSalary) * 100;
      this.percentLiquidSalary = (this.liquidSalary / this.totalSalary) * 100;
    }
  }

  handleCalcSalary = (newSalary) => {
    this.setState({
      fullSalary: newSalary
    })
  }

  render() {
    this.calculateSalary();
    return (
      <div className="container">
        <h1>Cálculo Salarial - React</h1>
        <span>Digite salário bruto: </span><InputNumber number={this.totalSalary} onChangeNumber={this.handleCalcSalary} />
        <span>Base INSS: </span><InputReadOnly value={this.baseSalaryINSS}  />
        <span>Desconto INSS: </span><InputReadOnly value={this.contributionINSS} percent={this.percentINSS} />
        <span>Base IRPF: </span><InputReadOnly value={this.baseSalaryIRPF}  />
        <span>Desconto INSS: </span><InputReadOnly value={this.contributionIRPF} percent={this.percentIRPF} />
        <span>Salário Líquido: </span><InputReadOnly value={this.liquidSalary} percent={this.percentLiquidSalary} />

        <div className={css.flexRow}>
            <BarSalary style={css.barIRPF} width={this.percentIRPF}  />
            <BarSalary style={css.barINSS} width={this.percentINSS}  />
            <BarSalary style={css.barLiquidSalary} width={this.percentLiquidSalary}  />
          </div>
      </div>
    );
  }
}
