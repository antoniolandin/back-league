'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Usuarios', {
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
                onUpdate: "CASCADE"
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            contraseña: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cartera: {
                type: Sequelize.FLOAT,
                defaultValue: 500
            }
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
        await queryInterface.dropTable('Usuarios');
    }
};
