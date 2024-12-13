const { FantasyEquipos, Usuarios } = require('../../models')
const handleError = require('../../utils/handleError')

const getEquipo = async (req, res) => {
    try {
        const id_usuario = req.user.id

        if (!Usuarios.findByPk(id_usuario)) {
            handleError(res, "El usuario no existe", 404)
            return
        }

        const equipo = await FantasyEquipos.findAll({where: {id_usuario: id_usuario}}).then(function(equipo) {
            if (!equipo) {
                handleError(res, "No tienes equipos", 404)
                return
            }
            
            res.status(200).json(equipo)
        }).catch(function(err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        handleError(res, error, 400)   
    }

}

module.exports = getEquipo
