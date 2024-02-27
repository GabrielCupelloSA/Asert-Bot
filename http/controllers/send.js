const ctrlSend = async (req, res) => {
  const adapterProvider = req.ws; // Adaptador del proveedor de servicios
  const body = req.body;
  const message = body.content; // Mensaje recibido
  const phone = body.conversation.meta.sender.phone_number.replace('+',''); // Número de teléfono del remitente

  if(body.message_type !== 'outgoin'){
    res.send({a:1}); // Envía una respuesta si el tipo de mensaje no es saliente
    return;
  }

  await adapterProvider.sendText(
    `${phone}@c.us`, message); // Envía un mensaje de texto al número de teléfono del remitente
  console.log({phone, message}); // Registra el número de teléfono y el mensaje en la consola
  res.send({phone, message}); // Envía una respuesta con el número de teléfono y el mensaje
};

module.exports = { ctrlSend };
