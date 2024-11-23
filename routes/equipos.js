const express = require('express');
const router = express.Router();
const { postEquipo, getJugadores, getEquipo, getEquipos, deleteEquipo } = require('../controllers/equipo')
const { validatorCreateEquipo } = require('../validators/equipos')

router.post('/', validatorCreateEquipo, postEquipo)
router.get('/:id/jugadores', getJugadores)
router.get('/:id', getEquipo)
router.get('/', getEquipos)
router.delete('/:id', deleteEquipo)

module.exports = router
