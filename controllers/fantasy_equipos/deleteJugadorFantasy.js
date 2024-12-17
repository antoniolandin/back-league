const { Jugadores, FantasyEquipos, Usuarios } = require("../../models")
const handleError = require("../../utils/handleError")

const deleteJugadorFantasy = async (req, res) => {
    try {
        const id_jugador = req.params.id
        const id_usuario = req.user.id

        const jugador = await Jugadores.findByPk(id_jugador)
        if(!jugador) {
            handleError(res, "Jugador no encontrado", 404)
            return
        }
        
        const equipo = await FantasyEquipos.findOne({
            where: {
                id_usuario: id_usuario
            }
        })
        if(!equipo) {
            handleError(res, "El usuario no tiene un equipo fantasy", 404)
            return
        }

        const usuario = await Usuarios.findByPk(id_usuario)
        if(!usuario) {
            handleError(res, "El usuario no existe", 404)
            return
        }

        const result = await equipo.removeJugadore(jugador)
        if (!result) {
            handleError(res, "Error al eliminar el jugador", 400)
            return
        }
        
        usuario.cartera += jugador.precio
        await usuario.save()

        res.status(200).json({msg: "Eliminado correctamente"})
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = deleteJugadorFantasy
