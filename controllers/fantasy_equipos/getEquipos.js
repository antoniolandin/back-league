const { FantasyEquipos, Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const getEquipos = async (req, res) => {
    try {
        const equipos = await FantasyEquipos.findAll({
            order: [['puntos', 'DESC']]
        })

        // si el equipo tiene jugadores
        if (equipos.length > 0) {
            // declaramos el array de los json que devolveremos 
            const equipos_json = []

            // iteramos sobre los equipos
            for (i = 0; i < equipos.length; i++) {
                // obtenemos los jugadores de la BBDD
                const jugadores = await equipos[i].getJugadores()

                // filtramos los jugadores para quedarnos solo con los campos importantes
                const jugadores_filtrados = jugadores.map(jugador => ({
                    id: jugador.id,
                    nombre: jugador.nombre
                }))

                // pasamos el equipo a JSON y añadimos un campo nuevo con los jugadores
                const equipo = equipos[i].toJSON()
                equipo.jugadores = jugadores_filtrados

                // añadimos el equipo al array
                equipos_json.push(equipo)
            }

            // enviamos la respuesta
            res.status(200).json(equipos_json)
        } else {
            handleError(res, "No hay equipos", 404)
        }

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getEquipos
