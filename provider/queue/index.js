const Queue = require("bull"); // Importa el módulo de cola Bull

const processQueue = new Queue("message_process", "redis://redis:6380"); // Crea una nueva cola de procesamiento

class QueueWS {
  constructor() {
    processQueue.process((job, done) => { // Procesa los trabajos en la cola
    setTimeout(() => {
      const { data } = job; // Obtiene los datos del trabajo
      console.log(data); // Imprime los datos en la consola
      done(); // Indica que el trabajo ha sido completado
    }, 2000);
  });
}

  addProcess = async (data = {}) => {
    processQueue.add( // Agrega un nuevo trabajo a la cola
      { data }, // Datos del trabajo
      {
        attempts: 1, // Número de intentos
      }
    );
  };

  onProcess = () => {}; // Función de proceso
}

module.exports = QueueWS; // Exporta la clase QueueWS
