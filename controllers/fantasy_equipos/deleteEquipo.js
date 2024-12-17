const { FantasyEquipos } = require("../../models")
const handleError = require("../../utils/handleError")

const deleteEquipo = async (req, res) => {
    try {
        const id = req.user.id
        
        const result = await FantasyEquipos.destroy({where: {id_usuario: id}})
        if (!result) {
            handleError(res, "Error al eliminar el equipo", 400)
            return
        }

        res.status(200).json({msg: "Equipo eliminado"})
    } catch (error) {
        handleError(error, res, 400)
    }
}

module.exports = deleteEquipo
