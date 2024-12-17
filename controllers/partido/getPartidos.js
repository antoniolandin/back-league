const { Partidos } = require('../../models')
const handleError = require('../../utils/handleError')

const getPartidos = async (req, res) => {
    try {
        const partidos = await Partidos.findAll()
        
        const json = []
        var a = 0

        // Iterar sobre los partidos usando for...of
        for (const partido of partidos) {
            // Accede a los equipos relacionados
            const equipos = await partido.getEquipos({
                through: { attributes: ['goles'] }
            })

            // Verificar si el partido ya ocurrió
            if (new Date(partido.fecha) < new Date()) {
                // Extraer los goles desde la tabla intermedia EquiposPartidos
                const goles_1 = equipos[0]?.EquiposPartidos?.goles || 0; // Validar que existan valores
                const goles_2 = equipos[1]?.EquiposPartidos?.goles || 0;

                // Determinar el equipo ganador
                let equipo_ganador = null;
                if (goles_1 > goles_2) {
                    equipo_ganador = equipos[0].dataValues;
                } else if (goles_2 > goles_1) {
                    equipo_ganador = equipos[1].dataValues;
                }
                
                partido_data = partido.dataValues
                equipo_1 = equipos[0].dataValues
                equipo_2 = equipos[1].dataValues

                // Construir el objeto JSON
                json.push({
                    id: partido_data.id,
                    equipo_uno: equipo_1.nombre,
                    equipo_dos: equipo_2.nombre,
                    equipo_ganador: equipo_ganador.nombre,
                    goles_uno: goles_1,
                    goles_dos: goles_2,
                    fecha: partido_data.fecha 
                });

                a = a + 1
            }
        }

        res.status(200).json(json);
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getPartidos
