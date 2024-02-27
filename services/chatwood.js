// Definición de la clase ChatWood
class ChatWood {
  token = ""; // Inicialización del token de autenticación
  config = { accounts: 1 }; // Configuración por defecto con una cuenta
  api = ``; // Inicialización de la URL de la API

  // Constructor de la clase ChatWood
  constructor(_token = "", _api = "", _config = {}) {
    this.token = _token; // Asigna el token proporcionado al token de autenticación
    this.api = _api; // Asigna la URL de la API proporcionada a la URL de la API
    this.config = { ...this.config, ..._config }; // Fusiona la configuración por defecto con la proporcionada
  }

  // Método para construir el encabezado de la solicitud
  buildHeader = () => {
    const header = new Headers(); // Crea un nuevo encabezado
    header.append("api_access_token", this.token); // Agrega el token de acceso al encabezado
    header.append("Content-Type", "application/json"); // Establece el tipo de contenido del encabezado
    return header; // Devuelve el encabezado construido
  };

  // Método para obtener los mensajes de la bandeja de entrada
  getInbox = async () => {
    const requestOptions = {
      method: "GET",
      headers: this.buildHeader(), // Utiliza el encabezado construido
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/inboxes`,
      requestOptions
    );
    const data = await dataAPI.json(); // Convierte la respuesta en formato JSON
    return data.payload; // Devuelve los mensajes de la bandeja de entrada
  };

  // Método para buscar un contacto por número de teléfono
  searchByNumber = async (phone) => {
    const requestOptions = {
      method: "GET",
      headers: this.buildHeader(), // Utiliza el encabezado construido
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/contacts/search?include_contact_inboxes=false&page=1&sort=-last_activity_at&q=${phone}`,
      requestOptions
    );
    const data = await dataAPI.json(); // Convierte la respuesta en formato JSON
    console.log(data.payload); // Imprime los datos del contacto en la consola
    return data.payload; // Devuelve los datos del contacto
  };

  // Método para crear una bandeja de entrada
  createInbox = async (dataIn) => {
    const payload = {
      name: "BOTWS",
      channel: {
        type: "api",
        webhook_url: "",
      },
    };
    const raw = JSON.stringify({ ...payload, ...dataIn });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(), // Utiliza el encabezado construido
      body: raw, // Establece el cuerpo de la solicitud
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/inboxes`,
      requestOptions
    );
    const data = await dataAPI.json(); // Convierte la respuesta en formato JSON
    return data; // Devuelve la respuesta
  };

  // Método para crear un contacto
  createContact = async (dataIn) => {
    const payload = {
      phone_number: dataIn.phone_number,
      custom_attributes: { phone_number: dataIn.phone_number },
    };
    const raw = JSON.stringify({ ...payload, ...dataIn });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(), // Utiliza el encabezado construido
      body: raw, // Establece el cuerpo de la solicitud
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/contacts`,
      requestOptions
    );
    const data = await dataAPI.json(); // Convierte la respuesta en formato JSON
    return data; // Devuelve la respuesta
  };

  // Método para obtener las conversaciones
  getConversations = async () => {
    const requestOptions = {
      method: "GET",
      headers: this.buildHeader(), // Utiliza el encabezado construido
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/inboxes`,
      requestOptions
    );
    const data = await dataAPI.json(); // Convierte la respuesta en formato JSON
    return data.payload; // Devuelve las conversaciones
  };
  /**
   *
   * @param dataIn
   * @returns
   */
  createConversation = async (dataIn) => {
    const payload = {
      custom_attributes: { phone_number: dataIn.phone_number },
    };
    const raw = JSON.stringify({ ...dataIn, ...payload });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(),
      body: raw,
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/conversations`,
      requestOptions
    );
    const data = await dataAPI.json();
    return data;
  };
  /**
   *
   * @param dataIn
   * @returns
   */
  filterConversation = async (dataIn) => {
    const payload = [
      {
        attribute_key: "phone_number",
        attribute_model: "standard",
        filter_operator: "equal_to",
        values: [dataIn.phone_number],
        custom_attribute_type: "",
      },
    ];
    const raw = JSON.stringify({payload});

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(),
      body: raw,
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/conversations/filter`,
      requestOptions
    );
    const data = await dataAPI.json();
    return data;
  };

  /**
   *
   * @param msg
   * @param mode
   * @returns
   */
  createMessage = async (dataIn) => {

    const raw = JSON.stringify({
      content: dataIn.msg,
      message_type: dataIn.mode,
      private: true,
    });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(),
      body: raw,
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/conversations/${dataIn.conversationId}/messages`,
      requestOptions
    );
    const data = await dataAPI.json();
    return data;
  };
}

module.exports = ChatWood