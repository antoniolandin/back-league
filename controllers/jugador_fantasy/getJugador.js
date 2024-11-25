const { jugadores_fantasy } = require("../../models")

const handleError = require("../../utils/handleError")

const getJugador = async (req, res) => {
    try {
        const id_jugador = req.params.id
        const jugador = await jugadores_fantasy.findByPk(id_jugador).then(function (jugador) {
            if (jugador) {
                res.status(200).json(jugador)
            } else {
                handleError(res, "Jugador no encontrado", 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getJugador
