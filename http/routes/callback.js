const { Router } = require("express");
const { ctrlCallBack } = require("../controllers/callback");
const router = Router(); // Crea un enrutador de Express

/**
 * Ruta cuando se realiza un pago exitoso
 */
router.get("/", ctrlCallBack); // Maneja la solicitud GET en la raíz y llama al controlador ctrlCallBack

module.exports = router; // Exporta el enrutador
