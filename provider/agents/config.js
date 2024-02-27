const { init } = require("bot-ws-plugin-openai");

const employeesAddonConfig = {
  model: "gpt-4", // Configura el modelo de OpenAI como "gpt-4"
  temperature: 0, // Establece la temperatura como 0
  apiKey: process.env.OPENAI_API_KEY, // Utiliza la clave de API de OpenAI del entorno
};
const employeesAddon = init(employeesAddonConfig); // Inicializa el complemento de empleados con la configuración proporcionada

module.exports = { employeesAddon, employeesAddonConfig }; // Exporta el complemento de empleados y su configuración
