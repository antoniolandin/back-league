'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipos.belongsToMany(models.Partidos, {through: 'EquiposPartidos', foreignKey: 'id_equipo', otherKey: 'id_partido'})
    }
  }
  Equipos.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    partidos_jugados: DataTypes.INTEGER,
    victorias: DataTypes.INTEGER,
    derrotas: DataTypes.INTEGER,
    empates: DataTypes.INTEGER,
    puntos: DataTypes.INTEGER,
    goles_favor: DataTypes.INTEGER,
    goles_contra: DataTypes.INTEGER,
    goles_diferencia: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Equipos',
  });
  return Equipos;
};
