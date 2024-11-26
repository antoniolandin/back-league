const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateJugador = [
    check('id_equipo').trim().escape().
        exists().withMessage("El id del equipo es obligatorio").bail().
        notEmpty().withMessage("El id del equipo no puede estar vacío").bail().
        isInt({ min: 1 }).withMessage("El id del equipo debe ser un entero mayor que cero"),

    check('nombre').trim().escape().
        exists().withMessage("El nombre es obligatorio").bail().
        notEmpty().withMessage("El nombre no puede estar vacío"),

    check('primer_apellido').trim().escape().optional().
        notEmpty().withMessage("El primer apellido no puede estar vacío").bail().
        isLength({ min: 2, max: 15 }).withMessage("El primer apellido debe tener entre 2 y 15 carácteres"),

    check('segundo_apellido').trim().escape().optional().
        notEmpty().withMessage("El segundo apellido no puede estar vacío").bail().
        isLength({ min: 2, max: 15 }).withMessage("El segundo apellido debe tener entre 2 y 15 carácteres"),

    check('grado').trim().escape().optional().
        notEmpty().withMessage("El grado no puede estar vacío").bail().
        isLength({ min: 2, max: 15 }).withMessage("El grado debe tener entre 2 y 15 carácteres"),

    check('curso').trim().escape().optional().
        notEmpty().withMessage("El curso no puede estar vacío").bail().
        isInt({ min: 0 }).withMessage("El curso debe ser un entero positivo"),

    check('goles').trim().escape().optional().
        notEmpty().withMessage("Los goles no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los goles deben ser un entero positivo"),

    check('partidos_jugados').trim().escape().optional().
        notEmpty().withMessage("Los partidos jugados no pueden estar vacíos").bail().
        isInt({ min: 0 }).withMessage("Los partidos jugados deben ser un entero positivo"),

        (req, res, next) => {
    return validateResults(req, res, next)
}
]

module.exports = { validatorCreateJugador }
