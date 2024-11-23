const express = require('express');
const router = express.Router();
const { getJugador, getJugadores, postJugador } = require('../controllers/jugador')
const { validatorCreateJugador } = require('../validators/jugadores')

router.get('/', getJugadores)
router.get('/:id', getJugador)
router.post('/', validatorCreateJugador, postJugador)

module.exports = router
