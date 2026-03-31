import express, { Router } from "express";
import playerControllers from "../controllers/playerController.js";

const router = express.Router();

router.get("/", playerControllers.obtenerJugadores);
router.post("/", playerControllers.crearJugador);
router.put("/:id", playerControllers.actualizarJugador);
router.delete("/:id", playerControllers.eliminarJugador);

export default router;