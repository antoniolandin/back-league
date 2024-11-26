const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check('nombre').exists().withMessage("El nombre es obligatorio").
        notEmpty().withMessage("El nombre no puede estar vacío").
        isLength({ max: 15, min: 3 }).withMessage("El nombre debe tener entre 3 y 15 carácteres"),

    check('email').exists().withMessage("El email es obligatorio").
        notEmpty().withMessage("El email no puede estar vacío").
        isEmail().withMessage("El email es incorrecto"),

    check('contraseña').exists().withMessage("La contraseña es obligatoria").
        notEmpty().withMessage("La contraseña no puede estar vacía").
        isLength({ max: 50, min: 3 }).withMessage("La contraseña tiene que tener entre 3 y 50 carácteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check('email').exists().withMessage("El email es obligatorio").
        notEmpty().withMessage("El email no puede estar vacío").
        isEmail().withMessage("El email es incorrecto"),

    check('contraseña').exists().withMessage("La contraseña es obligatoria").
        notEmpty().withMessage("La contraseña no puede estar vacía"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorLogin, validatorRegister }
