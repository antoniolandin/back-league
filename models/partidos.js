'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Partidos.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    id_equipo_1: DataTypes.INTEGER,
    id_equipo_2: DataTypes.INTEGER,
    jugado: DataTypes.BOOLEAN,
    goles_equipo_1: DataTypes.INTEGER,
    goles_equipo_2: DataTypes.INTEGER,
    jornada: DataTypes.INTEGER,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Partidos',
  });
  return Partidos;
};
