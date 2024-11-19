'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Partidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_equipo_1: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'Equipos'
            },
            key: 'id',
        },
        onUpdate: "CASCADE",
        allowNull: false
      },
      id_equipo_2: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'Equipos'
            },
            key: 'id',
        },
        onUpdate: "CASCADE",
        allowNull: false

      },
      jugado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      goles_equipo_1: {
        type: Sequelize.INTEGER
      },
      goles_equipo_2: {
        type: Sequelize.INTEGER
      },
      jornada: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Partidos');
  }
};
