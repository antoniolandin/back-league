const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const handleError = require("../utils/handleError")

const validatorCreateEquipoFantasy = [
    check('id_user').trim().escape()
        .exists().withMessage("El id_user es obligatorio").bail()
        .notEmpty().withMessage("El id_user no puede estar vací")
        .isInt().withMessage("El id_user debe ser un número"),
    check('nombre').trim().escape()
        .exists().withMessage("El nombre es obligatorio").bail()
        .notEmpty().withMessage("El nombre no puede estar vacío"),
    check('puntos').isInt().withMessage("Los puntos deben ser numéricos"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipoFantasy }
