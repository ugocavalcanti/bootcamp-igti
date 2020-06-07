const fs = require("fs");

const statesFile = "Estados.json";
const citiesFile = "Cidades.json";
let states = null;
let cities = null;

async function init() {
    let dataStates =  fs.promises.readFile(statesFile, "utf8");
    let dataCities =  fs.promises.readFile(citiesFile, "utf8");

    states = JSON.parse(await dataStates);
    cities = JSON.parse(await dataCities);
}

async function createFileStates(){
    try {
        states.forEach(async (state) => {
            let citiesOfState = cities.filter(city => city.Estado === state.ID);
            fs.writeFile(`${state.Sigla}.json`, JSON.stringify(citiesOfState), (err) => {if (err) console.log(err)});
        });
    } catch (err) {
        console.log(err.message);
    }
}


async function countCitiesOfState(uf){
    try{
        let dataFileState = await fs.promises.readFile(`${uf}.json`, "utf8");
        let state = JSON.parse(dataFileState);
        console.log(state.length);
    } catch(err) {
        console.log(err.message);
    }
}


async function fiveHaveMoreAndFewerCities(){
    try {
        await init();

        let statesWithCountCities = states.map(state => {
            let citiesOfState = cities.filter(city => city.Estado === state.ID);
            return {
                uf: state.Sigla,
                countCities: citiesOfState.length
            }
        });
        statesWithCountCities.sort((a, b) => {
            return b.countCities - a.countCities;
        })
        let listFiveStateWithMoreCities = [];
        console.log("As UFs com mais cidades:")
        for(i = 0 ; i<5 ; i++){
            listFiveStateWithMoreCities[i] = statesWithCountCities[i];
            console.log(listFiveStateWithMoreCities[i].uf + " - " + listFiveStateWithMoreCities[i].countCities);
        }

        let listFiveStateWithFewerCities = [];
        console.log("As UFs com menos cidades:");
        for(i = statesWithCountCities.length-5, j = 0 ; i < statesWithCountCities.length; i++, j++){
            listFiveStateWithFewerCities[j] = statesWithCountCities[i];
            console.log(listFiveStateWithFewerCities[j].uf + " - " + listFiveStateWithFewerCities[j].countCities);
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function biggestLengthNameCity() {
    try {
        await init();
        console.log("The cities with the biggest name of its states:")
        let statesWithBiggestCity = states.map(state => {
            let citiesOfState = cities.filter(city => city.Estado === state.ID);

            let cityOfState = citiesOfState[0];
            citiesOfState.forEach(city => {
                if (cityOfState.Nome.length < city.Nome.length) {
                    cityOfState = city;
                } else if (cityOfState.Nome.length == city.Nome.length){
                    if (city.Nome < cityOfState.Nome){
                        cityOfState = city;
                    }
                }
            });
            console.log(cityOfState.Nome + " - " + state.Sigla);
            return {
                uf: state.Sigla,
                biggestCity: cityOfState.Nome,
                lengthNameCity:  cityOfState.Nome.length
            }
        });
        
        let theBiggest = statesWithBiggestCity[0];
        statesWithBiggestCity.forEach(element => {
            if (element.lengthNameCity > theBiggest.lengthNameCity){
                theBiggest = element;
            }else if (element.lengthNameCity == theBiggest.lengthNameCity) {
                if (element.biggestCity < theBiggest.biggestCity){
                    theBiggest = element;
                }
            }
        });
        
        console.log(`The biggest city name of the states is: ${theBiggest.biggestCity} - ${theBiggest.uf}`);

    } catch (err) {
        console.log(err.message);
    }
}

async function smallestLengthNameCity() {
    try {
        await init();
        console.log("The cities with the smallest name of its states:")
        let statesWithSmallestCity = states.map(state => {
            let citiesOfState = cities.filter(city => city.Estado === state.ID);

            let cityOfState = citiesOfState[0];
            citiesOfState.forEach(city => {
                if (city.Nome.length < cityOfState.Nome.length ) {
                    cityOfState = city;
                } else if (cityOfState.Nome.length == city.Nome.length){
                    if (city.Nome < cityOfState.NOme){
                        cityOfState = city;
                    }
                }
            });
            console.log(cityOfState.Nome + " - " + state.Sigla);
            return {
                uf: state.Sigla,
                smallestCity: cityOfState.Nome,
                lengthNameCity: cityOfState.Nome.length
            }
        });

        let theSmallest = statesWithSmallestCity[0];
        statesWithSmallestCity.forEach(element => {
            if (element.lengthNameCity < theSmallest.lengthNameCity){
                theSmallest = element;
            }else if (element.lengthNameCity == theSmallest.lengthNameCity) {
                if (element.smallestCity < theSmallest.smallestCity){
                    theSmallest = element;
                }
            }
        });

        console.log(`The smallest city name of the states is: ${theSmallest.smallestCity} - ${theSmallest.uf}`);

    } catch (err) {
        console.log(err.message);
    }
}

async function resolve(){
    await countCitiesOfState("pb");
    console.log(" ");
    await fiveHaveMoreAndFewerCities();
    console.log(" ");
    await biggestLengthNameCity();
    console.log(" ");
    await smallestLengthNameCity();

}

resolve();