const { FantasyEquipos, Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const getEquipos = async (req, res) => {
    try {
        const result = await FantasyEquipos.findAll({
            order: [['puntos', 'DESC']]
        }).then(function (result) {
            if (result.length) {
                res.status(200).json(result)
            } else {
                handleError(res, 'No hay equipos inscritos', 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getEquipos
