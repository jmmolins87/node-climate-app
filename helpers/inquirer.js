const inquirer = require('inquirer');
require('colors');

const questionsOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?'.blue,
        choices: [
            {
                value: 1,
                name: `${ '1.'.blue } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.blue } Historial`
            },
            {
                value: 0,
                name: `${ '0.'.blue } Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('==========================='.blue);
    console.log('== Seleccione una opción =='.blue);
    console.log('===========================\n'.blue);

    const { option } = await inquirer.prompt( questionsOpts );
    return option;
}

const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.blue } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async( places = [] ) => {
    
        const choices = places.map( (place, i) => {
            const idx = `${ i + 1 }.`.blue;
            return {
                value: place.id,
                name: `${ idx } ${ place.name }`
            }
        });
    
        choices.unshift({
            value: '0',
            name: '0.'.blue + ' Cancelar'
        });
    
        const questions = [
            {
                type: 'list',
                name: 'id',
                message: 'Seleccione lugar: '.blue,
                choices
            }
        ]
    
        const { id } = await inquirer.prompt(questions);
        return id;
}

const confirm = async ( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showListCheckList = async( tasks = [] ) => {
    
    const choices = tasks.map( (task, i) => {
        const idx = `${ i + 1 }.`.blue;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`,
            checked: ( task.completedAt ) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione'.blue,
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);
    return ids;
} 



module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showListCheckList
}