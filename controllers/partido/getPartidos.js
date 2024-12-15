const { Partidos } = require('../../models')
const handleError = require('../../utils/handleError')

const getPartidos = async (req, res) => {
    try {
        const partidos = await Partidos.findAll()
        res.status(200).json(partidos)
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getPartidos
