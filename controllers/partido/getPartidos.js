const { Partidos } = require('../../models')
const handleError = require('../../utils/handleError')
const { Op } = require('sequelize')

const getPartidos = async (req, res) => {
    try {
        const fechaActual = new Date()

        const partidos = await Partidos.findAll({
            where: {
                fecha: {
                    [Op.lt]: fechaActual
                }
            }
        })
        
        const json = []

        for (const partido of partidos) {
            const equipos = await partido.getEquipos({
                through: { attributes: ['goles'] }
            })
            
            const partido_data = partido.dataValues
            const equipo_uno = equipos[0].dataValues
            const equipo_dos = equipos[1].dataValues

            const goles_uno = equipos[0]?.EquiposPartidos?.goles || 0
            const goles_dos = equipos[1]?.EquiposPartidos?.goles || 0

            console.log(goles_uno, goles_dos)
            // Determinar el equipo ganador
            let equipo_ganador = null;
            if (goles_uno > goles_dos) {
                equipo_ganador = equipo_uno;
            } else if (goles_dos > goles_uno) {
                equipo_ganador = equipo_dos;
            } else {
                equipo_ganador = { nombre: 'Empate' };
            }

            // Construir el objeto JSON
            json.push({
                id: partido_data.id,
                equipo_uno: equipo_uno.nombre,
                equipo_dos: equipo_dos.nombre,
                equipo_ganador: equipo_ganador.nombre,
                goles_uno: goles_uno,
                goles_dos: goles_dos,
                fecha: partido_data.fecha 
            })
        }

        res.status(200).json(json);
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getPartidos
