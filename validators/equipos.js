const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateEquipo = [
    check('nombre').trim().escape().
        exists().withMessage("El nombre es obligatorio").bail().
        notEmpty().withMessage("El nombre no puede estar vacío").bail().
        isLength({ min: 2, max: 15 }).withMessage("El nombre debe tener entre 2 y 15 carácteres"),

    check('partidos_jugados').trim().escape().optional().
        notEmpty().withMessage("Los partidos jugados no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los partidos jugados deben ser un entero positivo"),

    check('victorias').trim().escape().optional().
        notEmpty().withMessage("Las victorias no pueden estar vacías").bail().
        isInt({ min: 0 }).withMessage("Las victorias deben ser un entero positivo"),

    check('derrotas').trim().escape().optional().
        notEmpty().withMessage("Las derrotas no pueden estar vacías").bail().
        isInt({ min: 0 }).withMessage("Las derrotas deben ser un entero positivo"),

    check('empates').trim().escape().optional().
        notEmpty().withMessage("Los empates no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los empates deben ser un entero positivo"),

    check('puntos').trim().escape().optional().
        notEmpty().withMessage("Los puntos no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los puntos deben ser un entero positivo"),

    check('goles_favor').trim().escape().optional().
        notEmpty().withMessage("Los goles a favor no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los goles a favor deben ser un entero positivo"),

    check('goles_contra').trim().escape().optional().
        notEmpty().withMessage("Los goles en contra no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los goles en contra deben ser un entero positivo"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateEquipo }
