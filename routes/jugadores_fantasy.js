const express = require("express")
const { getJugador, getJugadores, postJugador } = require("../controllers/jugador_fantasy")

const router = express.Router()

router.get("/", getJugadores)
router.get("/:id", getJugador)
router.post("/", postJugador)

module.exports = router
