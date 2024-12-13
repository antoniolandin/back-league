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
      FantasyEquipos.belongsTo(models.Usuarios, {foreignKey: 'id_usuario'})
      FantasyEquipos.belongsToMany(models.Jugadores, {through: 'FantasyJugadores', foreignKey: 'id_equipo_fantasy', otherKey: 'id_jugador'})
    }
  }
  FantasyEquipos.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_usuario: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    puntos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FantasyEquipos',
  });
  return FantasyEquipos;
};
