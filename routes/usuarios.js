const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/usuario')

const { validatorRegister, validatorLogin } = require('../validators/usuarios')

router.post('/register', validatorRegister, signup)
router.post('/login', validatorLogin, signin)

module.exports = router
