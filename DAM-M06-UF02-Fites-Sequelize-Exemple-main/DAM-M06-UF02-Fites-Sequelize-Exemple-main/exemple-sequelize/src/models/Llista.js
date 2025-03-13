const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Llista = sequelize.define('Llista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_llista: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcio: {
        type: DataTypes.TEXT
    },
}, {
    tableName: 'llista' // Opcional: per assegurar que la taula es diu 'llista'
});

module.exports = Llista;