const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check('nombre').trim().escape().
        exists().withMessage("El nombre es obligatorio").bail().
        notEmpty().withMessage("El nombre no puede estar vacío").bail().
        isLength({ max: 15, min: 3 }).withMessage("El nombre debe tener entre 3 y 15 carácteres"),

    check('email').trim().escape().
        exists().trim().withMessage("El email es obligatorio").bail().
        notEmpty().withMessage("El email no puede estar vacío").bail().
        isEmail().withMessage("El email es incorrecto"),

    check('contraseña').trim().escape().
        exists().withMessage("La contraseña es obligatoria").bail().
        notEmpty().withMessage("La contraseña no puede estar vacía").bail().
        isLength({ max: 50, min: 3 }).withMessage("La contraseña tiene que tener entre 3 y 50 carácteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check('email').trim().escape().
        exists().trim().withMessage("El email es obligatorio").bail().
        notEmpty().withMessage("El email no puede estar vacío").bail().
        isEmail().withMessage("El email es incorrecto"),

    check('contraseña').trim().escape().
        exists().withMessage("La contraseña es obligatoria").bail().
        notEmpty().withMessage("La contraseña no puede estar vacía").bail().
        isLength({ max: 50, min: 3 }).withMessage("La contraseña tiene que tener entre 3 y 50 carácteres"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorLogin, validatorRegister }
