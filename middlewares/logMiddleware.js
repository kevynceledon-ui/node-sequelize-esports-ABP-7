// Middlware de "logs".

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//Obtenemos __dirname 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//definción del middleware


const logMiddleware = (req, res, next) =>{
    //obtención de fecha hora y ruta
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();
    const ruta = req.originalUrl;

//entrada del log

const logEntry = `[${fecha} ${hora}]- Ruta accedida: ${ruta}\n`;

//Ruta del archivo de logs
const logPath = path.join(__dirname, "../logs/log.txt");

//Esto es para escribir en el archivo

fs.appendFile(logPath, logEntry, (err) =>{
    if(err){
        console.error("Error al escribir el log", err);

    }
});

    next();
};

export default logMiddleware