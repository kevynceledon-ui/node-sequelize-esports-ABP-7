import { Player, Team }from "../models/index.js";
import { Op } from "sequelize"; //operador de busqueda de sequelize


//obtener jugadores por filtro:Búsqueda dinámica

const obtenerJugadores= async (req, res) =>{
    try{
        //extraxion del "role" de la URL       
        const {role} = req.query;
        //definicion al objeto donde se guardara la condición de busqueda
        let filtros = {};

        //Si el usuario envió un rol, se agrega la codición para el objeto.
        if(role){
            filtros.role = {
                [Op.iLike]: `%${role}%`
            };
        }
        //Ejecucion de la consulta a la db con las condiciones armadas.
        const jugadores = await Player.findAll({
            where: filtros,
            //inclusion de la relación con el equipo para mostrar datos completos.
            include: [{model: Team, as: "team", attributes: ["name"]}]
        });
        //respuesta exiotsa
        res.status(200).json(jugadores);

    }catch(error){
        console.error("Error al buscar jugadores", error);
        res.status(500).json({
            message: "Error interno al procesar los filtros de búsqueda",
            error: error.message
        });
    }

};

//Crear un jugador

const crearJugador = async (req, res) =>{
    try{
        const {nickname, fullname, role, teamId } = req.body;

        //crear registro en la DB
        const nuevoJugador = await Player.create({nickname, fullname, role, teamId});

        res.status(201).json({ message: "Jugador registrado con exito", data:nuevoJugador});

    }catch(error){
       
        //Validación para nickname
        if(error.name === "SequelizeUniqueConstraintError") {
            const valorRepetido = error.errors[0].value;
            return res.status(400).json({
                message: "Erro en el registro",
                detail: `El nickname "${valorRepetido}" ya se encuentra en uso.`
            });
        }

        console.error("Error al registrar:", error);
        res.status(500).json({
            message:"Ocurrió un error inesperado en el servidor",
            detail: error.message
        });
    }
};

//ruta "PUT /Player/:id" para actualizar un jugador existente
const actualizarJugador = async (req, res)=>{ 
    try{
        const {id} = req.params;
        const {nickname, fullname, role, teamId} = req.body;

        const jugador = await Player.findByPk(id);
        if(!jugador){
            return res.status(404).json({message:"Jugador no encontrado"});
        }
        await jugador.update({nickname, fullname, role, teamId});
        res.status(200).json({message: "Jugador actualizado exitosamente", data:jugador});
    }catch(error){
        res.status(500).json({message:"Erro al actualizar el jugador", error:error.message});
    }
};

const eliminarJugador = async (req, res) =>{
    try{
        const {id} = req.params;
        const resultado = await Player.destroy({where:{id}});

        if (!resultado){
            return res.status(404).json({message:"Error: El jugador con esa ID no existe"});
        }
        return res.status
    }catch(error){
        console.error("Error al eliminar el jugador", error);
        res.status(500).json({message: "Error al eliminar el registro", error: error.message});
    }
} 
export default {obtenerJugadores, crearJugador, actualizarJugador, eliminarJugador};        