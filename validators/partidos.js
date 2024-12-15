const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')


const validatorCreatePartido = [
    check('fecha').exists().notEmpty().withMessage('La fecha es obligatoria'),
    check('jornada').exists().notEmpty().isInt().withMessage('La jornada debe ser un número'),
    check('jugado'),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreatePartido }
