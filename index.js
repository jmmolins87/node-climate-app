require('dotenv').config()
require('colors');
const { 
    readInput, 
    inquirerMenu,
    pause, 
    listPlaces
} = require('./helpers/inquirer');
const Searchers = require('./models/searchers');

const main = async () => {

    const searches = new Searchers();
    let opt;

    do {

        opt = await inquirerMenu();
        
        switch( opt ) {
            case 1:
                // Mostrar mensaje
                const term = await readInput('Ciudad: ');

                // Buscar lugares
                const places = await searches.city( term );
                
                // Seleccionar el lugar
                const selectedId = await listPlaces( places );
                if( selectedId === '0' ) continue;
                const selectedPlace = places.find( place => place.id === selectedId );
                // Guardar en DB
                searches.addHistory( selectedPlace.name );

                // Clima
                const clime = await searches.climePlace( selectedPlace.lat, selectedPlace.lng );

                // Mostrar resultados
                console.log( '\nInformación de la ciudad\n'.blue );
                console.log( 'Ciudad:', selectedPlace.name.blue );
                console.log( 'Descripción:', clime.desc.blue );
                console.log( 'Lng:', selectedPlace.lng );
                console.log( 'Lat:', selectedPlace.lat );
                console.log( 'TempMín:', clime.min );
                console.log( 'TempMáx:', clime.max );
            break;
            case 2:
                searches.historialCapitalized.forEach(( place, i ) => {
                    const idx = `${ i + 1 }.`.blue;
                    console.log( `${ idx } ${ place }` );
                });
            break;
        }

        if ( opt !== 0 ) await pause();

    } while ( opt !== 0 );
};

main();