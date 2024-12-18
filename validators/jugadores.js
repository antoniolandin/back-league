const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateJugador = [
    check('id_equipo').exists().notEmpty().isInt(),
    check('nombre').exists().notEmpty(),
    check('primer_apellido').exists().notEmpty(),
    check('segundo_apellido'),
    check('grado'),
    check('curso'),
    check('goles'),
    check('partidos_jugados'),
    check('photo'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateJugador }
