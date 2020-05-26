let tabUsuarios = null;
let tabEstatisticas = null;

let inputTextSearch = null;
let buttonSearch = null;

let dataUsers = [];
let returnDataUsers = [];

let countMale = 0;
let countFemale = 0;
let sumAge = 0;
let avgAge = 0;

window.addEventListener("load", () => {
    tabUsuarios = document.querySelector("#idTabUsuarios");
    tabEstatisticas = document.querySelector("#idTabEstatisticas");

    inputTextSearch = document.querySelector("#idTextSearch");
    inputTextSearch.addEventListener("keyup", searchFromEnter);

    buttonSearch = document.querySelector(".button");
    buttonSearch.addEventListener("click", searchFromButton);

    dataUsers = buscarDados();
});

function searchFromEnter(event){
    if (event.key === "Enter" && inputTextSearch.value !== ""){
       render()
    }
}

function searchFromButton(){
   render();
}

function render(){
    searchUser();
    doStatistics();
    renderResults();
}
function searchUser(){
    returnDataUsers = dataUsers.filter((user) => {
        return user.name.toLowerCase().includes(inputTextSearch.value.toLowerCase());
    });
}

function doStatistics(){
    countMale = returnDataUsers.reduce((acc, user) =>{
        if (user.gender === "male"){
            return ++acc; 
        }else {
            return acc;
        }
    }, 0);

    countFemale = returnDataUsers.reduce((acc, user) =>{
        if (user.gender === "female"){
            return ++acc; 
        }else {
            return acc;
        }
    }, 0);

    sumAge = returnDataUsers.reduce((acc, user) => acc + user.age , 0);

    avgAge = sumAge / returnDataUsers.length;

}

function renderResults(){
    let  users = `<h2 class="titulos">${returnDataUsers.length} usuário(s) encontrado(s)</h2>`;
    let statistics = `<h2 class="titulos">Estatísticas</h2>`;

    returnDataUsers.forEach((user) =>{
        users += `
        <div class="user"><img src="${user.photo}" alt="${user.name}" /> ${user.name}, ${user.age} anos</div>
        `;
    });

    statistics += `
        <div class="user">Sexo masculino: <strong>${countMale}</strong></div>
        <div class="user">Sexo feminino: <strong>${countFemale}</strong></div>
        <div class="user">Soma das idades: <strong>${sumAge}</strong></div>
        <div class="user">Média das idades: <strong>${avgAge}</strong></div>
    `;
    tabEstatisticas.innerHTML = statistics;
    tabUsuarios.innerHTML= users;
}

async function buscarDados(){
    const dados = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
    const json = await dados.json();

    dataUsers = json.results.map(reg =>{
        const {name, picture, dob, gender} = reg;
        return {
            name: name.first +" " +name.last,
            age: dob.age,
            gender,
            photo: picture.thumbnail
        }
    });
}