const express = require("express")
const { getJugador, getJugadores, postJugador } = require("../controllers/jugador_fantasy")
const { validatorCreateJugadorFantasy } = require("../validators/jugadores_fantasy")

const router = express.Router()

router.get("/", getJugadores)
router.get("/:id", getJugador)
router.post("/", validatorCreateJugadorFantasy, postJugador)

module.exports = router
