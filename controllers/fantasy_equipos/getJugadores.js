const { FantasyEquipos, Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const getJugadores = async (req, res) => {
    try {
        const id_equipo = req.params.id

        const equipo = await FantasyEquipos.findByPk(id_equipo)
        
        if (!equipo) {
            handleError(res, "El equipo no existe", 404)
            return
        }

        const jugadores = await equipo.getJugadores().then(function(jugadores) {
            if (jugadores.length > 0) {
                res.status(200).json(jugadores)
            } else {
                handleError(res, "El equipo no tiene jugadores", 404)
            }
        }).catch(function(err) {
            handleError(res, err, 400)
        })

        //const result = Jugadores.findAll
    } catch (err) {
        handleError(res, err, 400)
    }
}

module.exports = getJugadores
