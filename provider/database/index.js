const MongoAdapter = require("./mongo"); // Importa el módulo de adaptador MongoDB

const MONGO_DB_URI = process.env.MONGO_DB_URI; // Obtiene la URI de la base de datos MongoDB del entorno
const MONGO_DB_NAME = process.env.MONGO_DB_NAME; // Obtiene el nombre de la base de datos MongoDB del entorno

const adapterDB = new MongoAdapter({ // Crea una instancia del adaptador MongoDB con la configuración proporcionada
  dbUri: MONGO_DB_URI, // Establece la URI de la base de datos
  dbName: MONGO_DB_NAME, // Establece el nombre de la base de datos
});

module.exports = { adapterDB }; // Exporta el adaptador de base de datos
