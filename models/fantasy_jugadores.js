'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FantasyJugadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FantasyJugadores.belongsTo(models.FantasyEquipos, {foreignKey: 'id_equipo_fantasy', as: 'equipoFantasy'})
      FantasyJugadores.belongsTo(models.Jugadores, {foreignKey: 'id_jugador', as: 'jugador'})
    }
  }
  FantasyJugadores.init({
    id_equipo_fantasy: DataTypes.INTEGER,
    id_jugador: DataTypes.INTEGER,
    puntos_jornada: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FantasyJugadores',
  });
  return FantasyJugadores;
};
