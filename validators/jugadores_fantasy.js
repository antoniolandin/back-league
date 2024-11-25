const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateJugadorFantasy = [
    check('id_equipo_fantasy').exists().notEmpty().isInt(),
    check('id_jugador').exists().notEmpty().isInt(),
    check('puntos_generados'),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = { validatorCreateJugadorFantasy }
