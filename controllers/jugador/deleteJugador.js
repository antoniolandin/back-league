const { Jugadores } = require("../../models")
const handleError = require("../../utils/handleError")

const deleteJugador = async (req, res) => {
    try {
        const { id } = req.params
        
        const result = await Juadores.destroy({ where: { id } }).then(function (result) {
            if (result) {
                res.status(200).json({ message: "Jugador eliminado" })
            } else {
                res.status(404).json({ message: "Jugador no encontrado" })
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = deleteJugador
