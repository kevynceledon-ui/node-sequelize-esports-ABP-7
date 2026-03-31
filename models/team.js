import { DataTypes } from "sequelize";
import conexion from "../utils/db.js"  //import de la variable "conexion" desde utils/db.js


//Definicion de la tabla "teams"

const Team = conexion.define ("Team",{
//Definición de name
    name: {type: DataTypes.STRING, allowNull: false, validate:{notEmpty: true}},  //el tip de dato en este caso texto(VARCHAR)
//JUEGO EN EL QUE COMPITE EL EQUIPO 
    game: {
        type: DataTypes.STRING,
        allowNull: false

    },


});

export default Team;