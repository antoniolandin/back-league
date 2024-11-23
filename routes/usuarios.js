const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/usuario')

router.post('/', signup)

module.exports = router
