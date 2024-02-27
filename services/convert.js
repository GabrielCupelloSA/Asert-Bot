// Importar la ruta de FFmpeg
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Importar FFmpeg  
const ffmpeg = require('fluent-ffmpeg');

// Establecer la ruta de FFmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Función para convertir OGG a MP3
const convertirOggAMp3 = async (inputStream, outStream) => {

  // Retornar una promesa para manejar la conversión
  return new Promise((resolve, reject) => {

    // Usar FFmpeg para convertir
    ffmpeg(inputStream)  
      .calidadDeAudio(96)
      .aFormato('mp3')
      .guardar(outStream)

      // Manejar el progreso y la finalización
      .on('progreso', () => {})
      .on('fin', () => {
        resolve(true);  
      });

  });

};

module.exports = { convertirOggAMp3 };
