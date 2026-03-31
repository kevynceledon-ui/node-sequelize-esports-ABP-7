import express from "express";
import teamController from "../controllers/teamController.js";

const router = express.Router();

//Definición de los endpoints 

router.post("/", teamController.crearEquipo); //POST para crear
router.get("/", teamController.obtenerEquipos); //GET para listar
router.put("/:id", teamController.actualizarEquipo); //PUT para actualizar
router.delete("/:id", teamController.eliminarEquipo); //DELETE para eliminar
router.post("/transactional", teamController.crearCapitanYequipo); //POST para crear equipo y capitan en una transacción

export default router;