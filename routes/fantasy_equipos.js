const express = require("express")
const { validatorCreateEquipoFantasy } = require("../validators")
const { authMiddleware } = require("../middleware/session")
const router = express.Router()
const { getEquipo, getEquipos, getJugadores, postEquipo, deleteEquipo, postJugadorFantasy } = require("../controllers/fantasy_equipos")

router.get("/", getEquipos)
router.get("/:id", getEquipo)
router.get("/:id/jugadores", getJugadores)
router.post("/", authMiddleware, validatorCreateEquipoFantasy, postEquipo)
router.post("/jugadores", authMiddleware, postJugadorFantasy)
router.delete("/:id", deleteEquipo)

module.exports = router
