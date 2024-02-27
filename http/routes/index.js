const express = require("express");
const fs = require("fs");
const router = express.Router(); // Crea un enrutador de Express

const PATH_ROUTES = __dirname; // Obtiene la ruta del directorio actual

const removeExtension = (fileName) => {
    return fileName.split('.').shift(); // Función para eliminar la extensión del nombre del archivo
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file); // Elimina la extensión del nombre del archivo
    if(name !== 'index'){
        console.log(`Cargando ruta ${name}`); // Registra el nombre de la ruta en la consola
        router.use(`/${name}`,require(`./${file}`)); // Utiliza el enrutador para la ruta y requiere el archivo correspondiente
    }
})

module.exports = router; // Exporta el enrutador