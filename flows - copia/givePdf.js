const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

/**
 * Flujo que se activa al recibir un documento
 * @returns
 */
const flowPDF = (globalState) =>
  // Agrega la palabra clave "EVENTS.DOCUMENT" al flujo
  addKeyword(EVENTS.DOCUMENT)
    // Agrega una acción al flujo para verificar el estado y tomar decisiones
    .addAction((_, { endFlow, state }) => {
      const currentState = state.getMyState();
      const baned = currentState?.baned ?? false;
      // Verifica si el usuario está bloqueado y finaliza el flujo si es necesario
      if (baned) return endFlow();
      // Verifica si el estado global no está activo, y en ese caso finaliza el flujo
      if (!globalState.status) {
        return endFlow();
      }
    })
    // Agrega una respuesta indicando que no se pueden recibir más archivos
    .addAnswer(
      "la memoria de mi celular esta llena no puedo recibir mas archivos..intenta con una nota de voz"
    );

module.exports = { flowPDF };
