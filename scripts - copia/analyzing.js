require("dotenv").config(); // Carga las variables de entorno desde el archivo .env para proyectos de Node.js

const { adapterDB } = require("../provider/database"); // Importa el adaptador de base de datos
const { completion } = require("../services/chatgpt"); // Importa la función de completado de chat GPT

const PROMPT = `El analisis de la conversacion entre vendedor y cliente y teniendo como tres unicaciones opciones de feedback para saber si el clientes esta contento son (DESCONTENTO, NEUTRAL, CONTENTO): "%%" se determina que el usuario esta: `; // Prompt para el análisis de la conversación

const getPlainText = (data = null) => {
  if (!data) return; // Retorna null si no hay datos
  return data.historial.join(",\n"); // Une el historial en un solo texto separado por comas y saltos de línea
};

const run = async () => {
  await adapterDB.init(); // Inicializa el adaptador de base de datos
  const list = await adapterDB.getLatestHistoyry(250); // Obtiene los últimos registros de historial

  try {
    for (const single of list) {
      const dataPrompt = getPlainText(single); // Obtiene el texto plano del historial
      const response = await completion(PROMPT.replace("%%", dataPrompt)); // Obtiene la respuesta del modelo de lenguaje GPT-3
      const anwser = response.data.choices[0].text.trim().replace(".", "").replace(" ", "").toUpperCase(); // Limpia y formatea la respuesta
      console.log({ numero: single.numero, anwser }); // Imprime el número y la respuesta en la consola
      await adapterDB.sentimentCustomer(single.numero, anwser); // Guarda el sentimiento del cliente en la base de datos
    }
  } catch (err) {
    console.log(`Error:`, err); // Maneja cualquier error y lo imprime en la consola
  }
};

run(); // Ejecuta la función principal
