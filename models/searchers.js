const axios = require('axios');
const colors = require('colors');
class Searchers { 

    historial = [ 'Madrid', 'Segovia', 'San José', 'Lima', 'Bogotá' ];

    constructor() {
        
        // TODO: leer DB si existe
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
            console.log( resp.data );

            return []; // Devolver los lugares

        } catch ( error ) {
            console.log('\nError en la petición'.red);
            return [];
        }
    }
}


module.exports = Searchers;