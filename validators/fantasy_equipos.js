const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const handleError = require("../utils/handleError")

const validatorCreateEquipoFantasy = [
    check('nombre').trim().escape()
        .exists().withMessage("El nombre es obligatorio").bail()
        .notEmpty().withMessage("El nombre no puede estar vacío"),
    check('puntos').isInt().withMessage("Los puntos deben ser numéricos"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipoFantasy }
