const { decryptData } = require("../../utils/hash");
const { exchange, register } = require("../services/e-learning");

const COURSE_ID = process.env.COURSE_ID ?? "";

/**
 * Controlador para la devolución de llamada
 * @param {*} req - Solicitud HTTP
 * @param {*} res - Respuesta HTTP
 */
const ctrlCallBack = async (req, res) => {
  const payload = req.query.p;
  const adapterDB = req.db;
  const adapterProvider = req.ws;

  if (!payload) {
    res.send({ data: "Ups algo paso con pago intenta de nuevo!" }); // Envía un mensaje de error si no hay payload
    return;
  }

  const data = decryptData(payload); // Descifra los datos del payload
  const [phone, status, email] = data.split("__") ?? [undefined, undefined, undefined];

  const check = await adapterDB.findIntent(phone); // Busca la intención de pago en la base de datos

  if (!check) {
    res.send({ data: "no exite registro de intencion de pago!" }); // Envía un mensaje si no hay registro de la intención de pago
    return;
  }

  if (["success", "fail"].includes(check.status)) {
    res.send({ data: "Vuelve a intentar con el link de pago" }); // Envía un mensaje para volver a intentar con el enlace de pago
    return;
  }

  if (status === "success") {
    await adapterProvider.sendText(
      `${phone}@c.us`,
      [
        "Felicitaciones! ya tienes acceso al curso 🙌",
        "un mail te llegara en los proximos minutos",
        "Si tienes algun inconveniente puedes escribirme un mail a Jesus .contacto@gmail.com", // Mensaje de éxito en lenguaje coloquial venezolano
      ].join("\n")
    );
    const code = await exchange(COURSE_ID, email); // Intercambia el código para obtener acceso al curso
    console.log(`Registando usuario:${email}`); // Registro de actividad
    if (code === 404) {
      const tmpUser = await register(email); // Registra al usuario
      console.log(`Registando usuario otra vez:${email}`, tmpUser); // Registro de actividad
      const tmp = await exchange(COURSE_ID, email); // Intercambia nuevamente el código para obtener acceso al curso
      console.log(`¿Se libero?:`, tmp); // Registro de actividad
    }
    res.redirect("#"); // Redirige a la página principal
  }

  if (status === "fail") {
    await adapterProvider.sendText(
      `${phone}@c.us`,
      [
        "Algo opcurrio con tu pago. Intenta nuevamente 🤕",
        "Si tienes algun inconveniente puedes escribirme un mail a Jesus .contacto@gmail.com", // Mensaje de error en lenguaje coloquial venezolano
      ].join("\n")
    );
    res.send({ data: "Algo opcurrio con tu pago. Intenta nuevamente 🤕" }); // Envía un mensaje de error
  }

  await adapterDB.updateIntent(phone, status); // Actualiza la intención de pago en la base de datos
};

module.exports = { ctrlCallBack };
