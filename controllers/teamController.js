import {Team, Player } from  "../models/index.js"
import conexion from "../utils/db.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../utils/pathHelper.js";


// Creando el equipo
// El uso de async y await es por que la comunicacion con la DB no es instantanea

const crearEquipo = async (req, res) =>{

    try{ //Extraccion de los datos que vienen en el body  de la peticion (JSON)
        const {name, game } =req.body;

        //Validacion para que los campos obligatorios existan 
        if (!name || !game){
            return res.status(400).json({message:"Nombre y juego son obligatorios"});s
        }

        //Usamos .create() de sequelize para insertar en postgres
        const nuevoEquipo = await Team.create ({name, game});
        //Respuesta de exito y el objeto creado
        res.status(201).json({
            message: "Equipo creado exitosamente",
            data: nuevoEquipo
        });

    }catch(error){
        console.log("Error al crear el equipo", error);
        res.status(500).json({message:"Error interno del servidor", error:error.message});
    }

};
//funcion para obtener todos los equipos
const obtenerEquipos = async (req, res) => {
    try{
        //el uso de .findAll es para buscar todos los registros en la tabal
        const equipos = await Team.findAll();
        res.status(200).json(equipos);

    }catch(error){
        res.status(500).json ({message:"Error al obtener equipos "});
    }
};

const crearCapitanYequipo = async (req, res) =>{
    
       const t = await conexion.transaction(); //Iniciamos una transaccion
    try{
        const { teamName, game, captainNickname, captainFullname, captainRole} = req.body;

        //Crear el equipo

        const nuevoEquipo = await Team.create({
            name: teamName,
            game: game
        }, {transaction: t }); //Asociamos la creacion del equipo a la transaccion


        //Crear al capitan asociado al equipo recien creado

        const nuevoCapitan = await Player.create({
            nickname: captainNickname,
            fullname: captainFullname,
            role: captainRole,
            teamId: nuevoEquipo.id, //Asociamos el jugador al equipo usando la clave foranea
            isCaptain: true
        }, {transaction: t }); //Asociamos la creacion del jugador a la misma transaccion

        //Si ambas tienen exito , confirmamos los cambios

        await t.commit();

        res.status(201).json({
            message:"Transacción exitosa: Equipo y capitan creados",
            data:{ equipo: nuevoEquipo, capitan: nuevoCapitan }
        });
       
    }catch(error){
        //si cualquiera de las 2 falla, se deshace todo
        await t.rollback();
       //Manejo de errores en log (tarea plus)
       const rutaLogErrores = path.join (__dirname, "../logs/errores.log");
       const mensajeError = `
       [${new Date().toLocaleString()}] FALLO EN TRANSACCIÓN:
       error: ${error.message}
       datos enviados: ${JSON.stringify(req.body)}`

       //Escribe el error meidante fs en el archivo de log
       fs.appendFileSync(rutaLogErrores, mensajeError);
       console.error("Error en transacción guarada en log", error);
       res.status(500).json({message:"Error en la transacción.Los cambios no se guardaron", error:error.message});
    }
}





const actualizarEquipo = async (req, res) =>{
    try{
        const {id} = req.params;  //Obtencion del ID desde la URL
        const {name, game } = req.body; //Obtencio de los nuevos datos desde el body

        //busca el equipo si el equipo existe antes de intentar actualizar
        const equipo = await Team.findByPk(id); //FindByPk es un metodo de sequelize para buscar por clave primaria
        if(!equipo){
            //Si el id no existe en postgres, repsponde con un error 404
            return res.status(404).json({message:"Equipo no encontrado"});
        }

        //actualizamos los campos
        await equipo.update({name, game });
        res.status(200).json({message:"Equipo actualizado exitosamente", data: equipo});

    }catch(error){
        res.status(500).json({message:"Error al actualizar el equipo", error:error.message});

    }
};

const eliminarEquipo = async (req, res)=>{
    try{
        const {id} =req.params;

        const tieneJugadores = await Player.findOne({where:{teamId:id}});

        if(tieneJugadores){
            //Si encontramos aun que sea 1 jugador , detenemos tood y manda error 400
            return res.status(400).json({message:"No se puede eliminar el equipo. Mantiene jugadores asociados. Elimina primero los jugadores o reasignalos a otro equipo."});
        }
        
        //Eliminacion directa usando destroy() busca y borra el registro que coincida con el ID proporcionado
        const filaBorrada = await Team.destroy({where:{id}});

        //Verificamos si se borro alguna fila, si no se borro ninguna fila es porque el ID no existia en la DB
        if (filaBorrada === 0){
            return res.status(404).json({message:"Equipo no encontrado para eliminar"});        
        }
        res.status(200).json({message:"Equipo eliminado exitosamente"});

        //Manejo de integridad referencial
        //Si el equipo tiene jugadores asociados, la eliminacion fallara por la restriccion de clave foranea.
        //  En ese caso, se captura el error y se responde con un mensaje adecuado.
    }catch(error){
        console.error("Error al eliminar el equipo", error);
        res.status(500).json({message:"Error al eliminar el equipo. Asegúrate de que tenga jugadores asociados", error:error.message});
    }
};



export default {crearEquipo,obtenerEquipos,actualizarEquipo,eliminarEquipo,crearCapitanYequipo};