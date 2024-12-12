const { FantasyEquipos, Jugadores } = require("../models")
const handleError = require("../utils/handleError")

const createRelations = async () => {
    try {
        const equipos = await FantasyEquipos.findAll()

        equipos.forEach(equipo => {
            equipo.addJugadores([1,2,3])
        })
    } catch (error) {
       handleError(error, "No se han podido crear las relaciones", 400)
    }
}
