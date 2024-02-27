const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { textToVoice } = require("../services/eventlab");

const LIMIT_TEXT = parseInt(process.env.LIMIT_TEXT ?? 800);

/**
 * Flujo de bienvenida para no empleados
 */
const flowNotEmployeeWelcome = addKeyword(EVENTS.ACTION)
  .addAction((_, { endFlow, state }) => {
    // Acción: Verifica el estado y toma decisiones
    const currentState = state.getMyState();
    const baned = currentState?.baned ?? false;
    if (baned) return endFlow(); // Finaliza el flujo si el usuario está bloqueado

    if (!globalState.status) {
      return endFlow(); // Finaliza el flujo si el estado global no está activo
    }
  })
  .addAnswer(["Hmm no estoy seguro...", "Recuerda que estoy diseñado para asistir sobre el curso y vender el curso. ¿Tienes alguna pregunta sobre el curso?"],
    null, async (ctx, { state, flowDynamic }) => {
      const currentState = state.getMyState();
      state.update({ fallBack: currentState?.fallBack ?? 1 });

      if(currentState?.fallBack > 2){
        await flowDynamic(`Creo que no, nos estamos entendiendo. Vuelve dentro de 40min! 🤷‍♀️`); // Mensaje de despedida en lenguaje coloquial venezolano
        state.update({ baned:true });
      }
    });

/**
 * Flujo principal de bienvenida
 * @param {*} globalState - Estado global del bot
 * @param {*} employeesAddon - Complemento de empleados
 * @returns
 */
const flowWelcome = (globalState, employeesAddon) =>
  addKeyword(EVENTS.WELCOME)
    .addAnswer("⏱️") // Respuesta inicial
    .addAction(async (ctx, ctxFn) => {
      const text = ctx.body;
      const currentState = ctxFn.state.getMyState();
      const txt = currentState?.answer ?? "";
      if (txt.length > LIMIT_TEXT) {
        ctxFn.state.update({ answer: '' });
      }

      const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
      const { employee, answer } = await employeesAddon.determine(fullSentence);
      ctxFn.state.update({ answer });
      if (employee) employeesAddon.gotoFlow(employee, ctxFn);
      if (!employee) ctxFn.gotoFlow(flowNotEmployeeWelcome);
    });

module.exports = { flowWelcome };
