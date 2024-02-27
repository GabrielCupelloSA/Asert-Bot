const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { textToVoice } = require("../services/eventlab");

/**
 * Flujo de notas de voz sobre ventas
 */
const flowVozVentas = (globalState) => addKeyword(EVENTS.ACTION) // Agrega la palabra clave de evento "ACTION" al flujo
  .addAction((_, { endFlow, state }) => {
    // Acción: Verifica el estado y toma decisiones
    const currentState = state.getMyState();
    const baned = currentState?.baned ?? false;
    if (baned) return endFlow(); // Finaliza el flujo si el usuario está bloqueado

    if (!globalState.status) {
      return endFlow(); // Finaliza el flujo si el estado global no está activo
    }
  })
  .addAnswer(
    ["dame un momento... mejor te envio nota de voz"], // Respuesta a la interacción del usuario
    null, // Sin acción adicional
    async (_, { flowDynamic, state }) => {
      console.log("🙉 texto a voz...."); // Registro de actividad
      const currentState = state.getMyState();
      const path = await textToVoice(currentState.answer); // Convierte el texto a voz y obtiene la ruta del archivo
      console.log(`🙉 Fin texto a voz....[PATH]:${path}`); // Registro de actividad
      await flowDynamic([{ body: "escucha", media: path }]); // Envía la nota de voz al usuario
    }
  );

module.exports = { flowVozVentas };
