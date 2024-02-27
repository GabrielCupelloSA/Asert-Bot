// Importar la función para encriptar datos
const { encryptData } = require("../utils/hash");

// Función para manejar el pago con Stripe
const handlerStripe = async (phone = '', email = '') => {

  // Obtener las claves de la API de Stripe y otros datos de entorno
  const stripeApiBase64 = process.env.STRIPE_SK;
  const priceId = process.env.PRODUCT_ID;
  const FRONT_URL = process.env.FRONT;

  // URL de la API de Stripe
  const URL = `https://api.stripe.com/v1/checkout/sessions`;

  // Crear el encabezado de la solicitud
  const headerObject = new Headers();
  headerObject.append("Content-Type", "application/x-www-form-urlencoded");
  headerObject.append("Authorization", `Basic ${stripeApiBase64}`);

  // Parámetros de la solicitud
  const urlencoded = new URLSearchParams();
  urlencoded.append("line_items[0][price]", priceId);
  urlencoded.append("line_items[0][quantity]", "1");
  urlencoded.append("allow_promotion_codes", "true");
  urlencoded.append("customer_creation", "always");
  urlencoded.append("success_url", `${FRONT_URL}/api/callback?p=${encryptData(`${phone}__success__${email}`)}`);
  urlencoded.append("cancel_url", `${FRONT_URL}/api/callback?p=${encryptData(`${phone}__fail__${email}`)}`);
  urlencoded.append("mode", "payment");

  // Configurar las opciones de la solicitud
  const requestOptions = {
    method: "POST",
    headers: headerObject,
    body: urlencoded,
  };

  // Realizar la solicitud a la API de Stripe
  const stripeRequest = await fetch(URL, requestOptions);
  const response = await stripeRequest.json(); // Convertir la respuesta a JSON
  return response; // Devolver la respuesta
};

module.exports = { handlerStripe }; // Exportar la función handlerStripe
