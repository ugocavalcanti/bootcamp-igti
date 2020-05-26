let  tabCountries = null;
let  listCountries = [];
let  countCountries = 0;
let  totalPopCountries = 0;

let tabFavorites = null;
let  listFavoriteCountries = [];
let countFavoriteCountries = 0;
let totalPopFavoriteCountries = 0;

let numberFormat = null;

window.addEventListener("load", () => {
    tabCountries = document.querySelector("#idTabCountries");
    tabFavorites = document.querySelector("#idTabFavoriteCountries");
    countCountries = document.querySelector("#idCountCountriesList");
    countFavoriteCountries = document.querySelector("#idCountFavoriteCountries");
    totalPopCountries = document.querySelector("#idTotalPopCountriesList");
    totalPopFavoriteCountries = document.querySelector("#idTotalPopFavoriteCountries");

    numberFormat = Intl.NumberFormat("pt-BR");

    // fetchCountries();
    fetchAsyncCountries();
});

async function fetchAsyncCountries(){
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const json = await res.json();
    listCountries = json.map(country => {
        // destruction
        const {numericCode, translations, population, flag} = country;
        return {
            id: numericCode,
            name: translations.pt,
            population,
            flag
        }
     }).sort((a, b) => a.name.localeCompare(b.name));
    
    render();
}

function  render(){
    renderCountriesList();
    renderFavoriteCountries();
    renderSummary();
    handleCountryButtons();
}

function renderCountriesList(){
    let countryHTML  = "";
    listCountries.forEach(country => {
        const {id, name, population, flag} = country;
        countryHTML += `
        <div class="country">
            <div>
                <a id="${id}" class="waves-effect waves-light btn">>></a>
            </div>
            <div>
                <img src="${flag}" alt="${name}"></img>
            </div>
            <div>
                ${name} <br> ${numberFormat.format(population)}
            </div>
        </div>
    `;
    
    });
    tabCountries.innerHTML= countryHTML;
    
}

function renderFavoriteCountries(){
    let countryHTML  = "";
    listFavoriteCountries.forEach(country => {
        const {id, name, population, flag} = country;
        countryHTML += `
        <div class="country">
            <div>
                <a id="${id}" class="waves-effect waves-light btn red darken-4"><<</a>
            </div>
            <div>
                <img src="${flag}" alt="${name}"></img>
            </div>
            <div>
                ${name} <br> ${numberFormat.format(population)}
            </div>
        </div>
         `;
    });
    tabFavorites.innerHTML= countryHTML;
}

function renderSummary(){
    countCountries.textContent = listCountries.length;
    countFavoriteCountries.textContent = listFavoriteCountries.length;
    totalPopCountries.textContent =numberFormat.format(
        listCountries.reduce((acc, country) => acc + country.population, 0));
    totalPopFavoriteCountries.textContent = numberFormat.format(
        listFavoriteCountries.reduce((acc, country) => acc + country.population, 0));

}

function handleCountryButtons(){
        const countryButtons = Array.from(tabCountries.querySelectorAll(".btn"));
        const favoriteButtons = Array.from(tabFavorites.querySelectorAll(".btn"));

        countryButtons.forEach(button => button.addEventListener("click", () => addToFavorites(button.id)));
        favoriteButtons.forEach(button => button.addEventListener("click", () => removeFromFavorites(button.id)));
    
}

function addToFavorites(idCountry){
    const buttonToAdd = listCountries.find(country => country.id === idCountry);
    
    listFavoriteCountries = [...listFavoriteCountries, buttonToAdd];
    listFavoriteCountries.sort((a, b) =>a.name.localeCompare(b.name));
    
    listCountries = listCountries.filter(country => country.id !== idCountry)

    render();
}

function removeFromFavorites(idCountry){
    const buttonToRemove = listFavoriteCountries.find(country => country.id === idCountry);
    
    listCountries = [...listCountries, buttonToRemove];
    listCountries.sort((a, b) =>a.name.localeCompare(b.name));
    
    listFavoriteCountries = listFavoriteCountries.filter(country => country.id !== idCountry)
    render();
}
// function addToFavorites(idCountry){
//     const buttonToAdd = listCountries.find(country => country.id === idCountry);
    
//     listFavoriteCountries.push(buttonToAdd);
//     listFavoriteCountries.sort((a, b) =>a.name.localeCompare(b.name));
    
//     let index = listCountries.indexOf(buttonToAdd)
//     listCountries.splice(index, 1);

//     render();
// }


// Implementação sem Async
function fetchCountries(){
    fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(json => {
            listCountries = json
            console.log(listCountries)
        });
    }