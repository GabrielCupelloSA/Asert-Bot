const EXTERNAL_USER = process.env.EXTERNAL_USER ?? ""; // Obtiene el nombre de usuario externo o una cadena vacía si no está definido
const EXTERNAL_PASS = process.env.EXTERNAL_PASS ?? ""; // Obtiene la contraseña externa o una cadena vacía si no está definida

const login = async () => {
  const apiResponse = await fetch(`#`, { // Realiza una solicitud a la API para iniciar sesión
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
    },
    body: JSON.stringify({ email: EXTERNAL_USER, password: EXTERNAL_PASS }), // Envía el nombre de usuario y la contraseña en formato JSON
  });

  const data = await apiResponse.json(); // Obtiene los datos de la respuesta en formato JSON
  return data.data.access_token; // Devuelve el token de acceso obtenido de la respuesta
};

const exchange = async (courseID = "", email = "") => {
  const token = await login(); // Obtiene el token de acceso llamando a la función de inicio de sesión
  const apiResponse = await fetch(`#v1/points/redeem`, { // Realiza una solicitud a la API para canjear puntos
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
      Authorization: `Bearer ${token}`, // Incluye el token de acceso en el encabezado de autorización
    },
    body: JSON.stringify({ courseID, email }), // Envía el ID del curso y el correo electrónico en formato JSON
  });

  const data = await apiResponse.json(); // Obtiene los datos de la respuesta en formato JSON
  return data.statusCode; // Devuelve el código de estado obtenido de la respuesta
};

const register = async (email) => {
  const apiResponse = await fetch(`#v1/auth/register`, { // Realiza una solicitud a la API para registrar un usuario
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
    },
    body: JSON.stringify({
      name: "Custom WS",
      description: "Soy un comprador desde el Bot de WS",
      email,
      password: `soy_chatbot_${Date.now()}`, // Genera una contraseña única utilizando la marca de tiempo actual
      byRefCode: "Jesus cupello",
    }), // Envía los datos del usuario en formato JSON
  });

  const data = await apiResponse.json(); // Obtiene los datos de la respuesta en formato JSON
  return data.data.user._id; // Devuelve el ID del usuario obtenido de la respuesta
};

const rechargePoint = async (points = 0, userId = "") => {
  const token = await login(); // Obtiene el token de acceso llamando a la función de inicio de sesión
  const apiResponse = await fetch(`#v1/points`, { // Realiza una solicitud a la API para recargar puntos
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como JSON
      Authorization: `Bearer ${token}`, // Incluye el token de acceso en el encabezado de autorización
    },
    body: JSON.stringify({
      userId: userId,
      amount: points,
      platform: "stripe",
      description: "Compra especial desde BOT WS",
      status: "success",
    }), // Envía los detalles de la recarga en formato JSON
  });

  const data = await apiResponse.json(); // Obtiene los datos de la respuesta en formato JSON
  return data; // Devuelve los datos obtenidos de la respuesta
};

module.exports = { login, rechargePoint, exchange, register }; // Exporta las funciones de inicio de sesión, recarga de puntos, canje y registro
