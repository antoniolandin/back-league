const { matchedData } = require("express-validator")

const { Partidos, Equipos } = require("../../models")
const handleError = require("../../utils/handleError")

const postPartido = async (req, res) => {
    try {
        const { id_equipo_1, id_equipo_2 } = req.body
        const body = matchedData(req)
        
        const equipo_1 = await Equipos.findByPk(id_equipo_1)
        const equipo_2 = await Equipos.findByPk(id_equipo_2)

        if (!equipo_1 || !equipo_2) {
            handleError(res, "Uno de los equipos no existe", 404)
            return
        }

        body.fecha = new Date(body.fecha)
        
        const partido = await Partidos.create(body)
        if (!partido) {
            handleError(res, "No se creo el partido", 400)
            return
        }
        
        try {
            await Promise.all([
                partido.addEquipo(id_equipo_1),
                partido.addEquipo(id_equipo_2),
            ])
        } catch (error) {
            handleError(res, error, 400)
            return
        }

        res.status(201).json({
            message: "Partido y relaciones creadas con exito",
            partido,
        })

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = postPartido
