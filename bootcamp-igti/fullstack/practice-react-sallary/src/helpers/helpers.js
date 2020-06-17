function calculateIRPF(baseCalc) {
    let sumIRPF = 0;
    switch(true) {
      case (baseCalc > 4664.69):
        sumIRPF = (baseCalc * 0.275) - 869.36;
        break;
      case (baseCalc >= 3751.06 && baseCalc <= 4664.68):
        sumIRPF = (baseCalc * 0.225) - 636.13;
        break;
      case (baseCalc >= 2826.66 && baseCalc <= 3751.05):
        sumIRPF = (baseCalc * 0.15) - 354.80;
        break;
      case (baseCalc >= 1903.99 && baseCalc <= 2826.66):
        sumIRPF = (baseCalc * 0.075) - 142.80;
        break;
      default:
        sumIRPF = 0;
    }
    return sumIRPF;
  }

  function calculateINSS(baseSalary) {
    let baseCalc = baseSalary;
    let sumINSS = 0;
    let diff = 0;
    let ajuste = 0.01;
    switch(true) {
      case (baseSalary > 6101.06):
        sumINSS = 713.10;
        break;
      case (baseSalary >= 3134.41 && baseSalary <= 6101.06):
        diff = (baseCalc - 3134.41);
        sumINSS += diff * 0.14;
        baseCalc -= diff + ajuste;
      case (baseSalary >= 2089.61 && baseSalary <= 3134.40):
        diff = (baseCalc - 2089.61);
        sumINSS += diff * 0.12;
        baseCalc -= diff + ajuste;
      case (baseSalary >= 1045.01 && baseSalary <= 2089.60):
        diff = (baseCalc - 1045.01);
        sumINSS += diff * 0.09;
        baseCalc -= diff + ajuste;
      default:
        sumINSS += baseCalc * 0.075;
    }
    return sumINSS;
  }

export { calculateIRPF,  calculateINSS }