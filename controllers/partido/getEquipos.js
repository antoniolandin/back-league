const { Partidos, Equipos }= require('../../models')
const handleError = require('../../utils/handleError')

const getEquipos = async (req, res) => {
    try {
        const id_partido = req.params.id
        
        const partido = await Partidos.findByPk(id_partido)
        if (!partido) {
            handleError(res, 'Partido no encontrado', 404)
            return
        } 

        const equipos = await partido.getEquipos().then(function(equipos) {
            if (equipos.length == 2) {
                res.status(200).json(equipos)
            } else {
                handleError(res, 'El partido no tiene 2 equipos', 400)
                return
            }
        }).catch(function(err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getEquipos
