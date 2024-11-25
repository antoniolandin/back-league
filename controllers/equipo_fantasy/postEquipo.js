const { matchedData } = require("express-validator")
const { equipos_fantasy } = require("../../models")
const { Usuarios } = require("../../models")
const handleError = require("../../utils/handleError")

const postEquipo = async (req, res) => {
    try {
        const body = req.body

        if (!body) {
            handleError(res, "Los datos del equipo deben estar completos", 400)
            return
        }

        const user = await Usuarios.findByPk(body.id_user).then(function (user) {
            if (!user) {
                handleError(res, "El usuario no existe", 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })

        const result = await equipos_fantasy.create(body).then(function (result) {
            if (result) {
                res.status(200).json(result)
            } else {
                handleError(res, "Error al crear el equipo", 400)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = postEquipo
