const { MongoClient } = require("mongodb"); // Importa el módulo MongoClient de MongoDB

class MongoAdapter {
  db; // Base de datos
  listHistory = []; // Lista de historial
  credentials = { dbUri: null, dbName: null }; // Credenciales de la base de datos

  constructor(_credentials) {
    this.credentials = _credentials; // Inicializa las credenciales con los valores proporcionados
  }

  init = async () => {
    try {
      const client = new MongoClient(this.credentials.dbUri, {}); // Crea una instancia del cliente MongoClient con la URI proporcionada
      await client.connect(); // Conecta con la base de datos
      console.log("🆗 Conexión Correcta DB"); // Imprime un mensaje de conexión exitosa en la consola
      const db = client.db(this.credentials.dbName); // Obtiene la base de datos
      this.db = db; // Asigna la base de datos a la propiedad 'db'
      return true; // Devuelve verdadero para indicar una conexión exitosa
    } catch (e) {
      console.log("Error", e); // Imprime cualquier error en la consola
      return; // Devuelve undefined en caso de error
    }
  };

  clearHistory = async (from) => {
    this.listHistory = []; // Limpia la lista de historial
    await this.db.collection("history").deleteMany({ from }); // Elimina los documentos de historial con el número especificado
  };

  getPrevByNumber = async (from) => {
    const result = await this.db
      .collection("history")
      .find({ from })
      .sort({ _id: -1 })
      .limit(1)
      .toArray(); // Obtiene el documento más reciente de historial con el número especificado
    return result[0]; // Devuelve el resultado obtenido
  };

  save = async (ctx) => {
    const ctxWithDate = {
      ...ctx,
      date: new Date(),
    }; // Agrega la fecha actual al contexto
    await this.db.collection("history").insertOne(ctxWithDate); // Inserta el contexto en la colección de historial

    this.listHistory.push(ctx); // Agrega el contexto a la lista de historial
  };

  createIntent = async (ctxIntents) => {
    await this.db.collection("intents").insertOne(ctxIntents); // Crea un nuevo intento en la colección de intenciones
  };

  updateIntent = async (phone, status) => {
    await this.db
      .collection("intents")
      .findOneAndUpdate(
        { phone },
        { $set: { status } },
        { sort: { dateAt: -1 }, returnOriginal: false }
      ); // Actualiza el estado de la intención más reciente con el número de teléfono especificado
  };

  sentimentCustomer = async (phone, sentiment) => {
    await this.db.collection("sentiments").findOneAndUpdate(
      { phone },
      { $set: { sentiment, date: new Date() } },
      {
        sort: { dateAt: -1 },
        upsert: true,
        returnOriginal: false,
      }
    ); // Actualiza o inserta un nuevo sentimiento para el número de teléfono especificado
  };

  findIntent = async (phone) => {
    return await this.db
      .collection("intents")
      .findOne({ phone }, { sort: { dateAt: -1 } }); // Busca la intención más reciente con el número de teléfono especificado
  };

  getAgents = async () => {
    return await this.db.collection("agents").find({}).toArray(); // Obtiene todos los agentes de la colección de agentes
  };

  getLatestHistoyry = async (numLimit) => {
    const result = await this.db.collection("history").aggregate([
      {
        $group: {
          _id: "$from",
          historial: { $push: "$answer" },
        },
      },
      {
        $limit: numLimit,
      },
      {
        $project: {
          _id: 0,
          numero: "$_id",
          historial: { $slice: ["$historial", -10] },
        },
      },
    ]); // Realiza una agregación en la colección de historial para obtener los últimos registros de historial para cada número

    return result.toArray(); // Devuelve el resultado obtenido como un array
  };
}

module.exports = MongoAdapter; // Exporta la clase MongoAdapter
