const { jugadores_fantasy } = require("../../models")
const { equipos_fantasy } = require("../../models/equipos_fantasy")
const { Jugadores } = require("../../models/jugadores")

const handleError = require("../../utils/handleError")

const postJugador = async (req, res) => {
    try {
        const body = req.body

        const equipo = await equipos_fantasy.findByPK(body.id_equipo_fantasy)

        if (!equipo) {
            handleError(res, "No existe el equipo", 404)
            return
        }

        const jugador = await Jugadores.findByPK(body.id_jugador)

        if (!jugador) {
            handleError(res, "No existe el jugador", 404)
            return
        }

        const result = await jugadores_fantasy.create(body)
        if (result) {
            res.status(200).json(result)
        } else {
            handleError(res, "Error al crear el jugador", 400)
        }
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = postJugador
