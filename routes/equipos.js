const express = require('express');
const router = express.Router();
const { postEquipo, getJugadores, getEquipo, getEquipos } = require('../controllers/equipo')
const { validatorCreateEquipo } = require('../validators/equipos')

router.post('/', validatorCreateEquipo, postEquipo)
router.get('/:id/jugadores', getJugadores)
router.get('/:id', getEquipo)
router.get('/', getEquipos)

module.exports = router
