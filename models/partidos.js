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
      Partidos.belongsToMany(models.Equipos, {through: 'EquiposPartidos', foreignKey: 'id_partido', otherKey: 'id_equipo'})
    }
  }
  Partidos.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    jugado: DataTypes.BOOLEAN,
    jornada: DataTypes.INTEGER,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Partidos',
  });
  return Partidos;
};
