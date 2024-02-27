// Importar el módulo fs
const fs = require('node:fs');

/**
 * Convierte texto en voz utilizando la API de Eleven Labs
 * @param {string} text - El texto a convertir en voz
 * @param {string} voiceId - (Opcional) El ID de la voz a utilizar
 * @returns La ruta del archivo de audio generado
 */
const textToVoice = async (text, voiceId = 'vwfl76D5KBjKuSGfTbLB') => {
  const EVENT_TOKEN = process.env.EVENT_TOKEN ?? ""; // Obtener el token de evento del entorno
  const URL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`; // URL de la API

  const header = new Headers(); // Crear un nuevo encabezado
  header.append("accept", "audio/mpeg"); // Establecer el tipo de contenido aceptado
  header.append("xi-api-key", EVENT_TOKEN); // Agregar el token de evento al encabezado
  header.append("Content-Type", "application/json"); // Establecer el tipo de contenido del encabezado

  const raw = JSON.stringify({ // Crear el cuerpo de la solicitud en formato JSON
    text,
    model_id: "eleven_multilingual_v1",
    voice_settings: {
      stability: 1,
      similarity_boost: 0.8,
    },
  });

  const requestOptions = { // Configurar las opciones de la solicitud
    method: "POST",
    headers: header,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(URL, requestOptions); // Realizar la solicitud a la API
  const buffer = await response.arrayBuffer(); // Obtener el contenido de la respuesta como un búfer
  const pathFile = `${process.cwd()}/tmp/${Date.now()}-auido.mp3`; // Ruta del archivo de audio

  fs.writeFileSync(pathFile, Buffer.from(buffer)); // Escribir el búfer en un archivo

  return pathFile; // Devolver la ruta del archivo de audio
};

module.exports = { textToVoice }; // Exportar la función textToVoice
