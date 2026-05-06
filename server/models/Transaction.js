const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Item = require('./Item');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Associations
Item.hasMany(Transaction, { foreignKey: 'itemId' });
Transaction.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = Transaction;
