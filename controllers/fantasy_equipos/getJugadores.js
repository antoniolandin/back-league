const { FantasyEquipos, Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const getJugadores = async (req, res) => {
    try {
        const id_equipo = req.params.id

        if (isNan(id_equipo)) {
            handleError(res, "El id del equipo debe ser un número", 400)
            return
        }

        const equipo = await FantasyEquipos.findByPk(id_equipo)
        
        if (!equipo) {
            handleError(res, "El equipo no existe", 404)
            return
        }

        const jugadores = await equipo.getJugadores()

        console.log(jugadores)

        //const result = Jugadores.findAll
    } catch (err) {
        handleError(res, err, 400)
    }
}

module.exports = getJugadores
