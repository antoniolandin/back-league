const express = require("express")
const { validatorCreateEquipoFantasy } = require("../validators/equipos_fantasy")

const router = express.Router()
const { getEquipo, getEquipos, getJugadores, postEquipo, deleteEquipo } = require("../controllers/equipo_fantasy")

router.get("/", getEquipos)
router.get("/:id", getEquipo)
router.get("/:id/jugadores", getJugadores)
router.post("/", validatorCreateEquipoFantasy, postEquipo)
router.delete("/:id", deleteEquipo)

module.exports = router
