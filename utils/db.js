//IMPORTS NECESARIOS

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//cargamos las variables de entorno para que process.env tenga los datos del .env

dotenv.config();


//configuracion de conexion tecnica: da los datos a sequelize para poder conectarse a la base de datos

const conexion = new Sequelize(
    
    process.env.DB_NAME, //nombre de la base de datos
    process.env.DB_USER, 
    process.env.DB_PASSWORD, //Contraseña de mi db
    {
        host:process.env.DB_HOST, //EL SERVIDOR 
        port: process.env.DB_PORT || 5432,
        logging: false, // evita que la consola se llene de comandos SQL 
        dialect: "postgres"
    }
);

export default conexion;