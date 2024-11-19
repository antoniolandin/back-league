const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateEquipo = [
    check('id').exists().notEmpty().isInt(),
    check('name').exists().notEmpty(),
    check('name').isLength({ max: 15 }),
    check('name').isLength({ min: 3 }),
    check('partidos_jugados').exists().notEmpty().isInt(),
    check('victorias').exists().notEmpty().isInt(),
    check('derrotas').exists().notEmpty().isInt(),
    check('empates').exists().notEmpty().isInt(),
    check('puntos').exists().notEmpty().isInt(),
    check('goles_favor').exists().notEmpty().isInt(),
    check('goles_contra').exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipo }
