const { flowWelcome } = require("./welcome");
const { flowVozVentas } = require("./sales");
const { flowVozExperto } = require("./expert");
const { flowSendLink, flowFallBackEmail } = require("./linkPay");
const { flowAudioVideo } = require("./giveMedia");
const { flowPDF } = require("./givePdf");
const { flowAdios } = require("./bye.js");
const { flowVoiceNote } = require("./giveVoiceNote");
const { flowOff, flowOn } = require("./onOff");
const { flowGreeting } = require("./greeting");
const { flowThankyou } = require("./thankyou");
const { flowAgent } = require("./agent");

module.exports = {
  // Importa y exporta los diferentes flujos de conversación del chatbot
  flowWelcome, // Flujo de bienvenida
  flowVozVentas, // Flujo de voz para ventas
  flowVozExperto, // Flujo de voz para expertos
  flowSendLink, // Flujo para enviar enlace de pago
  flowFallBackEmail, // Flujo de correo electrónico de respaldo
  flowAudioVideo, // Flujo para enviar archivos de audio y video
  flowPDF, // Flujo para enviar archivos PDF
  flowAdios, // Flujo de despedida
  flowVoiceNote, // Flujo para recibir notas de voz
  flowOff, // Flujo para desactivar funcionalidades
  flowOn, // Flujo para activar funcionalidades
  flowGreeting, // Flujo de saludo
  flowThankyou, // Flujo de agradecimiento
  flowAgent, // Flujo para conectar con un agente
};
