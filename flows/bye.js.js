const { addKeyword } = require("@bot-whatsapp/bot");

/**
 *
 * @returns
 */
const flowAdios = (globalState) =>
  // Agrega las palabras clave "adios", "bye" y "chao" al flujo
  addKeyword(["adios", "bye", "chao"])
    // Agrega una acción para verificar el estado y tomar decisiones
    .addAction((_, { endFlow, state }) => {
      const currentState = state.getMyState();
      const baned = currentState?.baned ?? false;
      if (baned) return endFlow();

      if (!globalState.status) {
        return endFlow();
      }
    })
    // Agrega una respuesta de despedida
    .addAnswer("Nos vemos!");

module.exports = { flowAdios };
