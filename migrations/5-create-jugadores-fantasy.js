'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FantasyJugadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_equipo_fantasy: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'FantasyEquipos'
            },
            key: 'id'
        },
        onUpdate: "CASCADE",
        allowNull: false
      },
      id_jugador: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'Jugadores'
            },
            key: 'id'
        },
        onUpdate: "CASCADE",
        allowNull: false
      },
      puntos_jornada: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('FantasyJugadores');
  }
};
