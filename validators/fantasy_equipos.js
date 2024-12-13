const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const handleError = require("../utils/handleError")

const validatorCreateEquipoFantasy = [
    check('nombre').exists().withMessage("El nombre es obligatorio").bail().notEmpty().withMessage("El nombre no puede estar vacío"),
    check('puntos'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorAddJugador = [
    check('id_equipo_fantasy').exists().notEmpty().isInt().withMessage("El id del equipo debe ser numérico"),
    check('id_jugador').exists().notEmpty().isInt().withMessage("El id del jugador debe ser numérico"),
    check('puntos_jornada'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipoFantasy, validatorAddJugador }
