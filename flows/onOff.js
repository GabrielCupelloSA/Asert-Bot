const { addKeyword } = require("@bot-whatsapp/bot");

/**
 *
 * @returns
 */
const { addKeyword } = require("@bot-whatsapp/bot");

// Flujo para activar el estado global del bot
const flowOn = (globalState) =>
  addKeyword(["bananaon"], { sensitive: true }) // Agrega la palabra clave "bananaon" al flujo, con sensibilidad a mayúsculas y minúsculas
    .addAction(() => {
      globalState.status = true; // Actualiza el estado global a true
    })
    .addAnswer("BOT ON!"); // Mensaje de confirmación


const flowOff = (globalState) =>
  addKeyword(["bananaoff"], { sensitive: true }) // Agrega la palabra clave "bananaoff" al flujo, con sensibilidad a mayúsculas y minúsculas
    .addAction(() => {
      globalState.status = false; // Actualiza el estado global a false
    })
    .addAnswer("BOT OFF!"); // Mensaje de confirmación


module.exports = { flowOn, flowOff };
