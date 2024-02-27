const { addKeyword } = require("@bot-whatsapp/bot");

/**
 * Flujo de agradecimiento
 * @param {*} globalState - Estado global del bot
 * @returns
 */
const flowThankyou = (globalState) =>
  addKeyword(["gracias", "thankyou"]) // Agrega las palabras clave "gracias" y "thankyou" al flujo
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
      "Estamos para servir! Recuerda que el momento para comenzar a ganar es ahora!"
    ); // Mensaje de agradecimiento y recordatorio

module.exports = { flowThankyou };
