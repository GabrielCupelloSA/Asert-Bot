const express = require("express"); // Importa el módulo express
const app = express(); // Crea una instancia de la aplicación express

const PORT = process.env.PORT ?? 4000; // Obtiene el puerto del entorno o utiliza el puerto 4000 por defecto

/**
 * Clase de API REST
 */
class ServerAPI {
  providerWS;
  providerDB;
  constructor(_providerWS, _providerDB) {
    this.providerWS = _providerWS; // Inicializa el proveedor de WS
    this.providerDB = _providerDB; // Inicializa el proveedor de DB
  }

  start() {
    const middleware = (req, _, next) => {
      req.ws = this.providerWS; // Agrega el proveedor de WS a la solicitud
      req.db = this.providerDB; // Agrega el proveedor de DB a la solicitud
      next();
    };
    app.use(express.json()); // Utiliza el middleware para analizar el cuerpo de la solicitud como JSON
    app.use("/api", middleware, require("./routes")); // Utiliza el middleware y las rutas bajo el prefijo '/api'
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); // Inicia el servidor en el puerto especificado
  }
}

module.exports = ServerAPI; // Exporta la clase ServerAPI
