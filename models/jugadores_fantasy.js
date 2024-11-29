'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jugadores_fantasy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jugadores_fantasy.init({
    id_equipo_fantasy: DataTypes.INTEGER,
    id_jugador: DataTypes.INTEGER,
    puntos_jornada: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jugadores_fantasy',
  });
  return jugadores_fantasy;
};