const { Equipos } = require('../../models')

const handleError = require('../../utils/handleError')

const deleteEquipo = async (req, res) => {
    try {
        const id = req.params.id
        
        const result = await Equipos.destroy({ where: { id } }).then(function (result) {

            if (result) {
                res.status(200).send({ message: 'Equipo eliminado' })
            } else {
                res.status(404).send({ message: 'Equipo no encontrado' })
            }
        }).catch(function (error) {
            handleError(res, error, 400)
        })

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = deleteEquipo
