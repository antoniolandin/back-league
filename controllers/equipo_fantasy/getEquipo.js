const { equipos_fantasy } = require('../../models')
const handleError = require('../../utils/handleError')

const getEquipo = async (req, res) => {
    const id = req.params.id

    const result = equipos_fantasy.findByPk(id).then(function (result) {
        if (result) {
            res.status(200).json(result)
        } else {
            handleError(res, "El equipo no existe", 404)
        }
    }).catch(function (err) {
        handleError(res, err, 400)
    })
}

module.exports = getEquipo
