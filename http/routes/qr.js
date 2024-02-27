const { Router } = require("express"); // Importa el módulo Router de Express
const { ctrlQR } = require("../controllers/qr"); // Importa el controlador ctrlQR desde el archivo qr.js
const router = Router(); // Crea un enrutador utilizando el módulo Router de Express

/**
 * Ruta para obtener el QR Code
 */
router.get("/", ctrlQR); // Maneja la solicitud GET en la raíz y llama al controlador ctrlQR

module.exports = router; // Exporta el enrutador
