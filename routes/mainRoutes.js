//Enrutador principal 

import Express from "express";
import mainController from "../controllers/mainController.js";

//creamos el "router"

const router = Express.Router();

//Definición de rutas

//raiz
router.get("/", mainController.getHome);

//Ruta de estado
router.get("/status", mainController.getStatus);

export default router;