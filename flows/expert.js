const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { delay } = require("../utils/utils");

/**
 * Flujo de explicación experta
 */
const flowVozExperto = (globalState) =>
  // Agrega la palabra clave "EVENTS.ACTION" al flujo
  addKeyword(EVENTS.ACTION)
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
    // Agrega una respuesta al flujo con un retraso y envía mensajes al flujo dinámico
    .addAnswer(
      ["dame un momento*..."],
      null, // No se especifica un retraso adicional
      async (_, { flowDynamic, state }) => {
        const currentState = state.getMyState();
        // Divide el texto completo en frases individuales y las envía al flujo dinámico con un retraso
        const fullText = currentState.answer.split(". ");
        for (const txt of fullText) {
          await flowDynamic(txt);
          await delay(1150); // Agrega un retraso de 1150 milisegundos entre cada mensaje
        }
      }
    );

module.exports = { flowVozExperto };
