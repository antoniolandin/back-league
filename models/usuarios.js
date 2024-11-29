'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Usuarios.hasOne(models.FantasyEquipos, {foreignKey: 'id_equipo_fantasy', as: 'fantasy'})
    }
  }
  Usuarios.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_equipo_fantasy: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    cartera: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};
