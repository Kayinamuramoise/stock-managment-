const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../db');
const Transaction = require('../models/Transaction');
const Item = require('../models/Item');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);

// Helper to format date
const startOfDay = (date) => new Date(date.setHours(0, 0, 0, 0));
const endOfDay = (date) => new Date(date.setHours(23, 59, 59, 999));

// Daily Report
router.get('/daily', async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const transactions = await Transaction.findAll({
            where: {
                userId,
                createdAt: {
                    [Op.between]: [startOfDay(new Date(today)), endOfDay(new Date(today))],
                },
            },
            include: [{ model: Item, attributes: ['name', 'category'] }],
            order: [['createdAt', 'DESC']],
        });
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch daily report' });
    }
});

// Monthly Report
router.get('/monthly', async (req, res) => {
    try {
        const userId = req.user.id;
        const date = new Date();
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

        const transactions = await Transaction.findAll({
            where: {
                userId,
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth],
                },
            },
            include: [{ model: Item, attributes: ['name', 'category'] }],
            order: [['createdAt', 'DESC']],
        });
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch monthly report' });
    }
});

module.exports = router;
