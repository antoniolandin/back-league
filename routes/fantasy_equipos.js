const express = require("express")
const { validatorCreateEquipoFantasy, validatorAddJugador } = require("../validators")
const { authMiddleware } = require("../middleware/session")
const router = express.Router()
const { getEquipo, getEquipos, getJugadores, postEquipo, deleteEquipo, postJugadorFantasy, deleteJugadorFantasy } = require("../controllers/fantasy_equipos")

router.get("/", authMiddleware, getEquipos)
router.get("/equipo", authMiddleware, getEquipo)
router.get("/:id/jugadores", authMiddleware, getJugadores)
router.post("/", authMiddleware, validatorCreateEquipoFantasy, postEquipo)
router.post("/jugadores", authMiddleware, validatorAddJugador, postJugadorFantasy)
router.delete("/:id", deleteEquipo)
router.delete("/jugadores/:id", authMiddleware, deleteJugadorFantasy)

module.exports = router
