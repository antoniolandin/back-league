const { jugadores_fantasy } = require("../../models")

const handleError = require("../../utils/handleError")

const getJugadores = async (req, res) => {
    try {
        const result = await jugadores_fantasy.findAll()

        if (jugadores) {
            res.status(200).json(result)
        } else {
            handleError(res, "Jugadores no encontrados", 404)
        }
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getJugadores
