const fs = require("fs"); // Importa el módulo fs para operaciones de sistema de archivos
const { Configuration, OpenAIApi } = require("openai"); // Importa las clases Configuration y OpenAIApi del módulo openai

/**
 * Función para chatear con el modelo de lenguaje GPT-3
 * @param {*} text - Texto para enviar al modelo
 */
const chat = async (text) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // Configura la clave de API de OpenAI
    });
    const openai = new OpenAIApi(configuration); // Crea una instancia de la API de OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Modelo de lenguaje GPT-3.5-turbo
      messages: [
        { role: "system", content: "Tu eres un vendedor amable que saluda al cliente, con frases cortas pero carismatico" }, // Mensaje de sistema
        { role: "user", content: text }, // Mensaje del usuario
      ],
    });
    return completion.data.choices[0].message; // Devuelve el mensaje de respuesta del modelo
  } catch (err) {
    console.log(err.response.data); // Maneja cualquier error e imprime los datos de respuesta en la consola
    return "ERROR"; // Devuelve "ERROR" en caso de error
  }
};

/**
 * Función para completar texto utilizando el modelo de lenguaje GPT-3
 * @param {*} dataIn - Texto de entrada para completar
 * @returns - Respuesta del modelo
 */
const completion = async (dataIn = '') => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Configura la clave de API de OpenAI
  });
  const openai = new OpenAIApi(configuration); // Crea una instancia de la API de OpenAI
  const response = await openai.createCompletion({
    model: "text-davinci-003", // Modelo de lenguaje text-davinci-003
    prompt: dataIn, // Texto de entrada para completar
    max_tokens: 256, // Máximo de tokens
    temperature: 0, // Temperatura
  });

  return response; // Devuelve la respuesta del modelo
}

module.exports = { chat, completion }; // Exporta las funciones chat y completion
