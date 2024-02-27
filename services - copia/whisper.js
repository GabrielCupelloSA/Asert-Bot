// Importar el módulo fs para manejar archivos
const fs = require("fs");

// Importar las clases Configuration y OpenAIApi del paquete openai
const { Configuration, OpenAIApi } = require("openai");

/**
 * Convierte voz a texto utilizando la API de OpenAI
 * @param {string} path - La URL del archivo de audio en formato mp3
 * @returns El texto transcrit
 */
const voiceToText = async (path) => {
  // Verificar si el archivo existe
  if (!fs.existsSync(path)) {
    throw new Error("No se encuentra el archivo");
  }

  try {
    // Configurar la API key de OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Crear una instancia de la API de OpenAI
    const openai = new OpenAIApi(configuration);

    // Crear la transcripción del archivo de audio
    const resp = await openai.createTranscription(
      fs.createReadStream(path), // Leer el archivo de audio
      "whisper-1" // Tipo de voz (opcional)
    );

    return resp.data.text; // Devolver el texto transcrit
  } catch (err) {
    console.log(err.response.data); // Manejar errores y mostrar detalles
    return "ERROR"; // Devolver un mensaje de error
  }
};

module.exports = { voiceToText }; // Exportar la función voiceToText
