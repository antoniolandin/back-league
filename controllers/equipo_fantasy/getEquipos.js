const { equipos_fantasy } = require("../../models")
const handleError = require("../../utils/handleError")

const getEquipos = async (req, res) => {
    try {
        const result = await equipos_fantasy.findAll({
            order: ['puntos', 'DESC']
        }).then(function (result) {
            if (result.length > 0) {
                res.status(200).json(result)
            } else {
                handleError(res, "No hay equipos", 404)
            }
        })
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getEquipos
