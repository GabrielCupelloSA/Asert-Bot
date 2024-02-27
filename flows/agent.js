const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

/**
 * Flujo de explicación experta
 */
const flowAgent = (globalState) =>
  // Agrega la palabra clave "EVENTS.ACTION" al flujo
  addKeyword(EVENTS.ACTION)
    // Agrega una acción al flujo para verificar el estado y tomar decisiones
    .addAction((_, { endFlow, state }) => {
      // Obtiene el estado actual
      const currentState = state.getMyState();
      // Verifica si el usuario está bloqueado
      const baned = currentState?.baned ?? false;
      // Si el usuario está bloqueado, finaliza el flujo
      if (baned) return endFlow();
      // Verifica si el estado global no está activo, y en ese caso finaliza el flujo
      if (!globalState.status) {
        return endFlow();
      }
    })
    // Agrega una respuesta al flujo con un retraso de 2500 milisegundos
    .addAnswer(
      ["un momento... consultado disponibilidad de agentes"],
      { delay: 2500 },
      // Utiliza la función "flowDynamic" para enviar mensajes al flujo dinámico
      async (_, { flowDynamic }) => {
        await flowDynamic([
          {
            // Envía un mensaje indicando la saturación del agente Jesús
            body: `Actualmente el agente JEsus esta saturado lo siento 🤷‍♂️`,
          },
          {
            // Recomienda enviar un correo electrónico en caso de consultas urgentes
            body: `Si tienes una consulta más urgente te recomiendo enviar un mail a Jesus .contacto@gmail.com`,
          },
        ]);
      }
    );

module.exports = { flowAgent };
