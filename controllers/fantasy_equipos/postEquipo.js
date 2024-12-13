const { matchedData } = require("express-validator")
const { FantasyEquipos, Usuarios } = require("../../models")
const handleError = require("../../utils/handleError")

const postEquipo = async (req, res) => {
    try {
        const body = matchedData(req)
        const id = req.dataToken.id

        if (!Usuarios.findByPk(id)) {
            handleError(res, "El usuario no existe", 404)
            return
        }

        if (!body) {
            handleError(res, "Los datos del equipo deben estar completos", 400)
            return
        }

        body.id_usuario = id

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
