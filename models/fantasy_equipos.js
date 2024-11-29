'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FantasyEquipos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FantasyEquipos.hasMany(models.Jugadores, {as: 'id'})
      FantasyEquipos.belongsTo(models.Usuarios, {foreignKey: 'id_usuario'})
      FantasyEquipos.belongsToMany(models.Jugadores, {through: 'fantasy_jugadores', foreignKey: 'id_equipo', as: 'equipo'})
    }
  }
  FantasyEquipos.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: DataTypes.STRING,
    id_usuario: DataTypes.INTEGER,
    puntos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'equipos_fantasy',
  });
  return FantasyEquipos;
};
