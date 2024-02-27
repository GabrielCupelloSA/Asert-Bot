module.exports = async (ctx, options) => {
  const globalState = options.globalState.getMyState(); // Obtiene el estado global
  const inboxId = globalState.inbox_id; // Obtiene el ID del buzón de entrada
  const chatwood = options.extensions.chatwood; // Obtiene la extensión chatwood
  const checkIsSave = await chatwood.searchByNumber(`${ctx.from}`); // Busca si el número está guardado
  const name = ctx?.pushName ?? ctx.ProfileName.split(" ").shift(); // Obtiene el nombre del contacto

  if (!checkIsSave.length) {
    const contactSave = await chatwood.createContact({
      // Crea un contacto si no está guardado
      phone_number: `+${ctx.from}`,
      name: name,
    });
    await options.state.update({
      // Actualiza el estado con el ID del contacto guardado
      chat_wood_id: contactSave.payload.contact.id ?? checkIsSave[0].id,
    });
  } else {
    await options.state.update({ chat_wood_id: checkIsSave[0].id }); // Actualiza el estado con el ID del contacto existente
  }

  const currentState = options.state.getMyState(); // Obtiene el estado actual

  const filterConversation = await chatwood.filterConversation({
    // Filtra la conversación por número de teléfono
    phone_number: ctx.from,
  });

  await options.state.update({
    // Actualiza el estado con el ID de la conversación
    conversation_id: filterConversation.payload.length
      ? filterConversation.payload[0].id
      : 0,
  });

  if (!filterConversation.payload.length) {
    // Crea una conversación si no existe
    const conversation = await chatwood.createConversation({
      inbox_id: inboxId,
      contact_id: currentState.chat_wood_id,
      phone_number: ctx.from,
    });

    await options.state.update({ conversation_id: conversation.id }); // Actualiza el estado con el ID de la conversación creada
  }

  //Si tienes asignado agente no continua
  if (filterConversation.payload.length && filterConversation.payload[0].meta) {
    const assignee = filterConversation.payload[0].meta?.assignee; // Verifica si hay un agente asignado
    if (assignee) return await options.endFlow(); // Finaliza el flujo si hay un agente asignado
  }
};
