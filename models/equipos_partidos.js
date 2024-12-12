'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquiposPartidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  equipos_partidos.init({
    id_partido: DataTypes.INTEGER,
    id_equipo: DataTypes.INTEGER,
    goles: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EquiposPartidos',
  });
  return EquiposPartidos;
};
