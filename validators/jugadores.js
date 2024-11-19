const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateJugador = [
    check('id').exists().notEmpty().isInt(),
    check('id_equipo').exists().notEmpty().isInt(),
    check('nombre').exists().notEmpty(),
    check('primer_apellido').exists().notEmpty(),
    check('segundo_apellido').exists().notEmpty(),
    check('grado').exists().notEmpty(),
    check('curso').exists().notEmpty(),
    check('goles').exists().notEmpty().isInt(),
    check('partidos_jugados').exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateJugador }
