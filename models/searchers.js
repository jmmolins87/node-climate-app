const fs = require('fs');

const axios = require('axios');
require('colors');

class Searchers { 

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        
        // leer DB si existe
        this.readDB();
    }

    get historialCapitalized() {

        return this.historial.map( place => {

            let words = place.split(' ');
            words = words.map( w => w[0].toUpperCase() + w.substring(1));
            return words.join(' ');
        });
    }

    get paramsMapBox() {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    async city( place = '' ) {

        try {
            // Petición HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapBox 
            });
            const resp = await instance.get();
            return  resp.data.features.map( place => ({
                // Objeto de forma implicita
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            })); // Devolver los lugares

        } catch ( error ) {
            console.log('\nError en la petición'.red);
            return [];
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async climePlace( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }

        } catch ( error ) {
            console.log('\nError en la petición'.red);
        }
    }  

    addHistory( place = '' ) {

        // Prevenir duplicados
        if( this.historial.includes( place.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0,5);
        this.historial.unshift( place.toLocaleLowerCase());

        // Grabar y leer BD
        this.saveDB();
    }

    saveDB() {

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
    }

    readDB() {

        if( !fs.existsSync( this.dbPath )) return;

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial;
    }
}


module.exports = Searchers;