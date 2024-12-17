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

        const json = []

        for (const partido of partidos) {
            const equipos = await partido.getEquipos({
                through: { attributes: ['goles'] }
            })

            const equipo_uno = equipos[0].dataValues
            const equipo_dos = equipos[1].dataValues

            const goles_uno = equipos[0]?.EquiposPartidos?.goles || 0
            const goles_dos = equipos[1]?.EquiposPartidos?.goles || 0

            json.push({
                id: partido.id,
                fecha: partido.fecha,
                equipo_uno: equipo_uno.nombre,
                equipo_dos: equipo_dos.nombre,
                equipo_ganador: null,
                goles_uno: goles_uno,
                goles_dos: goles_dos
            })
        }
        res.status(200).json(json)
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getProximosPartidos
