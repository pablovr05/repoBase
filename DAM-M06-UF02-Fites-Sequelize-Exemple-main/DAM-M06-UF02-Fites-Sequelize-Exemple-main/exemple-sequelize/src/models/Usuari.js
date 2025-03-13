const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuari = sequelize.define('Usuari', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_registre: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    idioma: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Usuaris'
});

module.exports = Usuari;