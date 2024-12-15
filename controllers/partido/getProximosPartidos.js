const { Partidos } = require('../../models')
const handleError = require('../../utils/handleError')
const { Op } = require('sequelize')

const getProximosPartidos = async (req, res) => {
    try {
        const fechaActual = new Date()

        const partidos = await Partidos.findAll({
            where: {
                fecha: {
                    [Op.gt]: fechaActual
                }
            }
        })
        res.status(200).json(partidos)
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getProximosPartidos
