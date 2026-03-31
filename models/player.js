import { DataTypes } from "sequelize";
import conexion from "../utils/db.js";

const Player = conexion.define("player",{
   
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  //No puede haber 2 jugadores con el mismo nombre
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING, //
        allowNull: false
    },
    isCaptain: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
    }
});

export default Player;


