const { Equipos } = require("../../models")
const handleError = require("../../utils/handleError.js")

const getEquipos = async (req, res) => {
    try {
        // buscar todos los equipos en la base de datos
        const result = Equipos.findAll({order: [
            ['puntos', 'DESC'],
            ['goles_diferencia', 'DESC']
        ]}).then(function (result) {
            if (result.length) {
                res.status(200).json(result)
            }
            else {
                handleError(res, 'No hay equipos inscritos', 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = getEquipos
