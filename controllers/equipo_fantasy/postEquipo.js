const { matchedData } = require("express-validator")
const { equipos_fantasy } = require("../../models")
const handleError = require("../../utils/handleError")

const postEquipo = async (req, res) => {
    try {
        const body = matchedData(req)

        if (!body) {
            handleError(res, "Los datos del equipo estan vacios", 400)
            return
        }

        const data = await equipos_fantasy.create(body)

        res.status(201).json(data)
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = { postEquipo }
