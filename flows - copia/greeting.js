const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { delay } = require("../utils/utils");

/**
 * Flow de explicacion experta
 */
const flowGreeting = (globalState) =>
  // Agrega las palabras clave "hola" y "hi" al flujo
  addKeyword(['hola','hi'])
    // Agrega una acción para verificar el estado y tomar decisiones
    .addAction((_, { endFlow, state }) => {
      const currentState = state.getMyState();
      const baned = currentState?.baned ?? false;
      // Verifica si el usuario está bloqueado y finaliza el flujo si es necesario
      if(baned) return endFlow();
      // Verifica si el estado global no está activo, y en ese caso finaliza el flujo
      if (!globalState.status) {
        return endFlow();
      }
    })
    // Agrega una acción asincrónica para actualizar el estado y enviar un mensaje de bienvenida dinámico
    .addAction(async (_, { flowDynamic, state }) => {
      state.update({ answer: "" }); // Actualiza la respuesta en el estado
      // Envía un mensaje de bienvenida dinámico
      await flowDynamic(`Buenas estoy aqui para vender! como puedo ayudarte`);
    });

module.exports = { flowGreeting };
