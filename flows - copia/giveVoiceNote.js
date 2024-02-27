const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerAI } = require("../utils/utils");

// Flujo para manejar respuestas de voz cuando no se reconoce al empleado
const flowNotEmployeeVoice = addKeyword(EVENTS.ACTION)
  // Agrega una acción para verificar el estado y tomar decisiones
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

  // Agrega una respuesta con opciones para el usuario
  .addAnswer(
    [
      "Hmm no estoy seguro...",
      "Recuerda que estoy diseñado para asistir sobre el curso y vender el curso. ¿Tienes alguna pregunta sobre el curso?",
    ],
    null, // No se especifica un retraso adicional
    async (ctx, { state, flowDynamic }) => {
      const currentState = state.getMyState();
      // Actualiza el contador de fallback en el estado
      state.update({ fallBack: currentState?.fallBack ?? 1 });
      // Verifica si el contador de fallback supera un límite y toma acciones en consecuencia
      if (currentState?.fallBack > 2) {
        await flowDynamic(
          `Creo que no, nos estamos entendiendo. Vuelve dentro de 40min! 🤷‍♀️`
        );
        state.update({ baned: true }); // Bloquea al usuario si el contador de fallback supera el límite
      }
    }
  );

const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerAI } = require("../utils/utils");

/**
 * Flujo para manejar respuestas de notas de voz
 * @param {*} employeesAddon
 * @returns
 */
const flowVoiceNote = (globalState, employeesAddon) =>
  // Agrega la palabra clave "EVENTS.VOICE_NOTE" al flujo
  addKeyword(EVENTS.VOICE_NOTE)
    // Agrega una acción para verificar el estado y tomar decisiones
    .addAction((_, { endFlow }) => {
      if (!globalState.status) {
        return endFlow();
      }
    })
    // Agrega una acción asincrónica para manejar la nota de voz
    .addAction(async (ctx, ctxFn) => {
      // Envía un mensaje indicando que se está escuchando
      await ctxFn.flowDynamic("dame un momento para escucharte...🙉");
      // Utiliza una función para manejar la inteligencia artificial y obtener una respuesta de texto
      const text = await handlerAI(ctx);
      const currentState = ctxFn.state.getMyState();
      // Combina la respuesta actual con la nueva respuesta de texto
      const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
      // Determina el empleado y la respuesta utilizando un complemento y actualiza el estado
      const { employee, answer } = await employeesAddon.determine(fullSentence);
      ctxFn.state.update({ answer });
      // Si se determina un empleado, redirige al flujo del empleado; de lo contrario, redirige al flujo "flowNotEmployeeVoice"
      if (employee) employeesAddon.gotoFlow(employee, ctxFn);
      if (!employee) ctxFn.gotoFlow(flowNotEmployeeVoice);
    });
module.exports = { flowVoiceNote };
