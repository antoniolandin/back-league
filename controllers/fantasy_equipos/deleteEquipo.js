const { FantasyEquipos } = require("../../models")
const handleError = require("../../utils/handleError")

const deleteEquipo = async (req, res) => {
    try {
        const id = req.params.id
        const result = await FantasyEquipos.destroy({
            where: {
                id: id,
            },
        }).then(function (error) {
            if (result) {
                res.status(200).send({message: "Equipo eliminado"})
            } else {
                res.status(404).send({message: "Equipo no encontrado"})
            }
        }).catch(function (error) {
            handleError(error, res, 400)
        })
    } catch (error) {
        handleError(error, res, 400)
    }
}

module.exports = deleteEquipo
