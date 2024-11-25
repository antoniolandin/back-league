const { validatorCreateEquipo } = require("./equipos")
const { validatorCreateJugador } = require("./jugadores")
const { validatorCreateEquipoFantasy } = require("./equipos_fantasy")
const { validatorCreateJugadorFantasy } = require("./jugadores_fantasy")

module.exports = {
    validatorCreateEquipo,
    validatorCreateJugador,
    validatorCreateEquipoFantasy,
    validatorCreateJugadorFantasy
}
