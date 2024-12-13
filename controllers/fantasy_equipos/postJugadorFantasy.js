const { FantasyEquipos, Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const postJugadorFantasy = async (req, res) => {
    try {
        const { id_equipo } = req.params.id_equipo
        const { id_jugador } = req.params.id_jugador
        const { id_usuario } = req.dataToken.id

        if (!Jugadores.findByPk(id_jugador)) {
            handleError(res, "El jugador no existe", 404)
            return
        }

        const equipo = await FantasyEquipos.findByPk(id_equipo)

        if (!equipo) {
            handleError(res, "El equipo no existe", 404)
            return
        }

        if (equipo.id_usuario != id_usuario) {
            handleError(res, "El equipo no pertenece al usuario", 400)
            return
        }

        const result = await equipo.addJugador(id_jugador).then(function (result) {
            if (result) {
                res.status(200).json(result)
            } else {
                handleError(res, "Error al añadir el jugador", 400)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = postJugadorFantasy
