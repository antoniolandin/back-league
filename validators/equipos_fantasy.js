const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const handleError = require("../utils/handleError")

const validatorCreateEquipoFantasy = [
    check('id_user').exists().notEmpty().isInt(),
    check('nombre').exists().notEmpty(),
    check('puntos'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipoFantasy }
