import * as fs from 'fs';
import * as path from 'path';

function analizarArchivo(rutaArchivo: string) {
 
  const contenido = fs.readFileSync(rutaArchivo, 'utf-8');

  
  const sinSaltosDeLinea = contenido.replace(/[\r\n]+/g, '');
  const totalCaracteres = sinSaltosDeLinea.length;


  const palabras = contenido
    .toLowerCase()
    .replace(/[^\w\sáéíóúüñ]/g, '')
    .trim()
    .split(/\s+/)
    .filter(p => p.length > 0);

  const totalPalabras = palabras.length;

  
  const conteo: { [palabra: string]: number } = {};
  for (const palabra of palabras) {
    conteo[palabra] = (conteo[palabra] || 0) + 1;
  }

  
  const histogramaOrdenado = Object.entries(conteo).sort((a, b) => {
    const [palabraA, freqA] = a;
    const [palabraB, freqB] = b;

    if (freqB !== freqA) {
      return freqB - freqA; 
    }
    return palabraA.localeCompare(palabraB); 
  });

 
  console.log(`${totalPalabras} words`);
  console.log(`${totalCaracteres} characters`);
  for (const [palabra, frecuencia] of histogramaOrdenado) {
    console.log(`${palabra}: ${frecuencia}`);
  }
}


const ruta = path.join(__dirname, 'texto.txt');
analizarArchivo(ruta);