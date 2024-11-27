const { jugadores_fantasy, equipos_fantasy } = require("../../models")
const handleError = require("../../utils/handleError")

const getJugadores = async (req, res) => {
    try {
        const id_equipo = req.params.id

        if (isNan(id_equipo)) {
            handleError(res, "El id del equipo debe ser un número", 400)
            return
        }

        const equipo = await equipos_fantasy.findByPk(id_equipo)

        if (!equipo) {
            handleError(res, "El equipo no existe", 404)
            return
        }

        const result = jugadores_fantasy.findAll({ where: { id_equipo: id_equipo } }).then(function (result) {
            if (result.length > 0) {
                res.status(200).json(result)
            } else {
                handleError(res, `El equipo ${equipo.nombre} no tiene fichajes`, 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (err) {
        handleError(res, err, 400)
    }
}

module.exports = getJugadores
