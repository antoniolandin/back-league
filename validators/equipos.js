const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateEquipo = [
    check('nombre').exists().notEmpty().isLength({ max: 15 }).isLength({ min: 3 }),
    check('partidos_jugados'),
    check('victorias'),
    check('derrotas'),
    check('empates'),
    check('puntos'),
    check('goles_favor'),
    check('goles_contra'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipo }
