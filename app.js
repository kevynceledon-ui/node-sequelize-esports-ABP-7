// Configuracion principal del servidor 

//=================import de los módulos con ES6 =====================

import dotenv from "dotenv";
import express from "express";
import path from "path";
import fs from "fs";
import hbs from 'hbs';

//=============import desde el helper.===========================
import { __dirname } from "./utils/pathHelper.js";

//==================importS middleware==============================

import logMiddleware from "./middlewares/logMiddleware.js";


//================= import conexión y models ==============

import conexion from "./utils/db.js";
import { Team, Player } from "./models/index.js"


// ==============import rutas, player y team ==================
import teamRoutes from "./routes/teamRoutes.js"
import playerRoutes from "./routes/playerRoutes.js";
import mainRoutes  from "./routes/mainRoutes.js";

//carga de las variables de entorno
dotenv.config();

// inicialización de express 

const app = express();
//Definición del puerto 
const PORT = process.env.PORT || 3000;


//Configuración del motor de plantillas en este caso HBS.

app.set("view engine","hbs");
app.set('views', path.join(__dirname,"..", 'views'));


//Configuración de middleware

//middleware para "Entender" JSON
app.use(express.json());

//middleware de archivos estaticos
app.use(express.static(path.join(__dirname,"..", "public")));


//Uso de middlewares

app.use(logMiddleware); //uso del middleware de logs


//----------Ruta de datos---------
app.use("/", mainRoutes); //rutas principales
app.use("/team", teamRoutes);
app.use("/player", playerRoutes);


//Función asincrona para esperar a la DB

const iniciarServer = async () => {
    try{
       //conexion.sync: sincroniza los modelos con las tablas existentesi no es el caso, las crea
       await conexion.sync({force:false}); //force:false verifica si las tablas existen, si no las crea
       console.log("Base de datos conectada y sincronizada");
        
       app.listen(PORT, () =>{
            console.log(`Servidor iniciado en http://localhost:${PORT}`);
            console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
       });
    }catch (error) {
        console.error(" No se pudo conectar a la base de datos:", error);
}
};

iniciarServer();
