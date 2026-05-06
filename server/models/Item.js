const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    minQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5, // Alert when stock is low
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'indigo', // Default combo color
    },
});

module.exports = Item;
