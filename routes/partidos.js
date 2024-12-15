const express = require('express')
const { validatorCreatePartido } = require('../validators')

const router = express.Router()
const { getPartidos, getProximosPartidos, getEquipos, postPartido } = require('../controllers/partido')

router.get('/', getPartidos)
router.get('/proximos', getProximosPartidos)
router.get('/:id', getEquipos)
router.post('/', validatorCreatePartido, postPartido)

module.exports = router
