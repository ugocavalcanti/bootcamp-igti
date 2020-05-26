window.addEventListener("load", start);

var rangeRed = null;
var rangeGreen = null;
var rangeBlue = null;

function start(){
    console.log("Olá");

    rangeRed = document.querySelector("#idRangeRed");
    rangeRed.addEventListener("input", alterarCor)
    
    rangeGreen = document.querySelector("#idRangeGreen");
    rangeGreen.addEventListener("input", alterarCor)

    rangeBlue = document.querySelector("#idRangeBlue");
    rangeBlue.addEventListener("input", alterarCor);

    alterarCor();
}

function alterarCor(){
    document.querySelector("#idValueRed").value = rangeRed.value;
    document.querySelector("#idValueGreen").value = rangeGreen.value;
    document.querySelector("#idValueBlue").value = rangeBlue.value;

    var painel = document.querySelector("#idPainel");
    painel.style.backgroundColor = "rgb( "+rangeRed.value +", "+rangeGreen.value +", "+rangeBlue.value+")";
}