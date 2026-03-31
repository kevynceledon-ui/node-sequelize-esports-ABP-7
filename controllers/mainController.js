//import modelos
import { Team, Player } from "../models/index.js";

// Controlador inicial 

//Función para la pagina de inicio  (home dinamico)
const getHome = async (req,res) =>{
    try{
        //Se busca a los guadores incluyendo su equipo asociado
        const jugadores = await Player.findAll({
            include: [{model: Team, as:"team"}]
        });

        //Se convierten los datos a un formato que HBS entienda
        const jugadoresData = jugadores.map( j => j.get({plain:true}));

    const datosVista ={ //datos dinamicos para la vista
        fechaActual: new Date().toLocaleDateString(),
        usuario: "Visitante",
        jugadores: jugadoresData
    };

    //Renderización de la vista HBS con los datos.

    res.render("home", datosVista);
} catch(error){
    console.error("Error al cargar la página de inicio", error);
    res.status(500).json({message: "Error interno del servidor"});
};

};
//Función  para el estado del servidor 

const getStatus = (req, res) =>{
    res.json({
        status:"OK",
        message: "El servidor está funcionando correctamente"

    });
};


//Exportación 

export default {getHome, getStatus};