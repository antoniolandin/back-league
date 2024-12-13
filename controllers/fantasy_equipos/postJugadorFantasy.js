const { FantasyEquipos, Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const postJugadorFantasy = async (req, res) => {
    try {
        const id_equipo_fantasy = req.body.id_equipo_fantasy
        const id_jugador = req.body.id_jugador
        const id_usuario = req.user.id

        if (!Jugadores.findByPk(id_jugador)) {
            handleError(res, "El jugador no existe", 404)
            return
        }

        const equipo = await FantasyEquipos.findByPk(id_equipo_fantasy)

        if (!equipo) {
            handleError(res, "El equipo no existe", 404)
            return
        }

        if (equipo.id_usuario != id_usuario) {
            handleError(res, "El equipo no pertenece al usuario", 400)
            return
        }

        const result = await equipo.addJugadore(id_jugador).then(function (result) {
            if (result) {
                res.status(200).json(result)
            } else {
                handleError(res, "Error al añadir el jugador", 400)
            }
        }).catch(function (err) {
            handleError(res, "Error en addJugador", 400)
        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = postJugadorFantasy
