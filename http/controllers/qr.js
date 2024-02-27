const { join } = require("path");
const fs = require('fs');

/**
 * Controlador para la devolución del código QR
 * @param {*} _ - Solicitud HTTP (no utilizado)
 * @param {*} res - Respuesta HTTP
 */
const ctrlQR = async (_, res) => {
  const PATH_QR = join(process.cwd(), `bot.qr.png`); // Ruta del archivo del código QR
  const fileStream = fs.createReadStream(PATH_QR); // Crea un flujo de lectura del archivo

  res.writeHead(200, { "Content-Type": "image/png" }); // Establece la cabecera de la respuesta con el tipo de contenido
  fileStream.pipe(res); // Envía el contenido del archivo como respuesta
};

module.exports = { ctrlQR };
