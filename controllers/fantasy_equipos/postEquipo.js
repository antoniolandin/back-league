const { matchedData } = require("express-validator")
const { FantasyEquipos } = require("../../models")
const handleError = require("../../utils/handleError")

const postEquipo = async (req, res) => {
    try {
        const body = matchedData(req)

        if (!body) {
            handleError(res, "Los datos del equipo deben estar completos", 400)
            return
        }

        const result = await FantasyEquipos.create(body).then(function (result) {
            if (result) {
                res.status(200).json(result)
            } else {
                handleError(res, "Error al crear el equipo", 400)
                return
            }
        }).catch(function (err) {
            handleError(res, err, 400)
            return
        })

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = postEquipo
