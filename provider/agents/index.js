/**
 * Lista de agentes
 * @param {*} flows - Flujos de agentes
 * @param {*} adapterDB - Adaptador de base de datos
 * @returns - Lista de agentes con flujos asignados
 */
const employees = async (flows, adapterDB) => {
  let listAgents = await adapterDB.getAgents(); // Obtiene la lista de agentes desde la base de datos
  listAgents = listAgents.map((agent) => { // Mapea los agentes y asigna los flujos correspondientes
    agent.flow = flows[parseInt(agent.flows)]; // Asigna el flujo al agente
    return agent;
  });
  console.log(listAgents); // Imprime la lista de agentes en la consola
  return listAgents; // Devuelve la lista de agentes con flujos asignados
};

module.exports = { employees }; // Exporta la función 'employees'
