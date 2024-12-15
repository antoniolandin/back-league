const { validatorCreateEquipo } = require("./equipos")
const { validatorCreateJugador } = require("./jugadores")
const { validatorCreateEquipoFantasy } = require("./fantasy_equipos")
const { validatorAddJugador } = require("./fantasy_equipos")
const { validatorCreatePartido } = require("./partidos")

module.exports = {
    validatorCreateEquipo,
    validatorCreateJugador,
    validatorCreateEquipoFantasy,
    validatorAddJugador,
    validatorCreatePartido
}
