//Esto es una "utilidad para rutas" facilita y mejora el codigo haciendolo mas limpio.

import { fileURLToPath } from "url";
import path from "path";


const __filename = fileURLToPath(import.meta.url); // "fileURLTopath():lo convierte a una ruta nativa del SO
                                                   //  import.meta.url Cotiene la URL del archivo actual
 
 //path.dirname()extrae el directorio padre de esa ruta.
 
 const __dirname = path.dirname(__filename);


 //export de ambas constantes para mayor flexibilidad.

 export {__dirname, __filename};