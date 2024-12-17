const { FantasyEquipos, Jugadores, Usuarios } = require("../../models")
const handleError = require("../../utils/handleError")

const postJugadorFantasy = async (req, res) => {
    try {
        const id_jugador = req.body.id_jugador
        const id_usuario = req.user.id

        const jugador = await Jugadores.findByPk(id_jugador)

        if (!jugador) {
            handleError(res, "El jugador no existe", 404)
            return
        }

        const equipo = await FantasyEquipos.findOne({where: {id_usuario: id_usuario}})

        if (!equipo) {
            handleError(res, "El equipo no existe", 404)
            return
        }

        const usuario = await Usuarios.findByPk(id_usuario)
        if (!usuario) {
            handleError(res, "El usuario no existe", 404)
            return
        }
        
        const result = await equipo.addJugadore(id_jugador)
        if (!result) {
            handleError(res, "Error al añadir el jugador", 400)
            return
        }

        if (usuario.cartera < jugador.precio) {
            handleError(res, "No tienes suficiente dinero", 400)
            return
        }

        usuario.cartera -= jugador.precio
        await usuario.save()

        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = postJugadorFantasy
