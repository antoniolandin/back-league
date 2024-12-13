const express = require('express');
const router = express.Router();
const { getJugador, getJugadores, postJugador, deleteJugador } = require('../controllers/jugador')
const { validatorCreateJugador } = require('../validators')

router.get('/', getJugadores)
router.get('/:id', getJugador)
router.post('/', validatorCreateJugador, postJugador)
router.delete('/:id', deleteJugador)

module.exports = router
