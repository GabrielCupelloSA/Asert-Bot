const { Router } = require("express"); // Importa el módulo Router de Express
const { ctrlSend } = require("../controllers/send"); // Importa el controlador ctrlSend desde el archivo send.js
const router = Router(); // Crea un enrutador utilizando el módulo Router de Express

/**
 * Ruta cuando se realiza un pago exitoso
 */
router.post("/", ctrlSend); // Maneja la solicitud POST en la raíz y llama al controlador ctrlSend

module.exports = router; // Exporta el enrutador
