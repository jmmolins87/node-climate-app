require('dotenv').config()
const colors = require('colors');
const { 
    readInput, 
    inquirerMenu,
    pause 
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
                const place = await readInput('Ciudad: ');
                await searches.city( place );
                // Buscar lugares
                // Seleccionar el lugar
                // Clima
                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.blue);
                console.log('Ciudad:', );
                console.log('Lng:', );
                console.log('Lat:', );
                console.log('TempMín:', );
                console.log('TempMáx:', );
                // console.clear();
            break;
        }

        if ( opt !== 0 ) await pause();

    } while ( opt !== 0 );
};

main();