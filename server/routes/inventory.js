const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Transaction = require('../models/Transaction');
const { sequelize } = require('../db');
const authenticateToken = require('../middleware/auth');

// Apply middleware to all routes
router.use(authenticateToken);

// Get all items
router.get('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await Item.findAll({ where: { userId } });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Add new item
router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, category, quantity, minQuantity, color } = req.body;
        const newItem = await Item.create({ name, category, quantity, minQuantity, userId, color });
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { name, category, minQuantity, color } = req.body;
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        if (item.userId !== userId) return res.status(403).json({ error: 'Unauthorized: You can only update your own items' });

        item.name = name;
        item.category = category;
        item.minQuantity = minQuantity;
        item.color = color || item.color;
        await item.save();

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Stock Movement (In/Out)
router.post('/:id/movement', async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { type, quantity } = req.body; // type: 'IN' or 'OUT'

        if (!['IN', 'OUT'].includes(type) || quantity <= 0) {
            return res.status(400).json({ error: 'Invalid movement data' });
        }

        const item = await Item.findByPk(id, { transaction: t });
        if (!item) {
            await t.rollback();
            return res.status(404).json({ error: 'Item not found' });
        }
        if (item.userId !== userId) {
            await t.rollback();
            return res.status(403).json({ error: 'Unauthorized: You can only modify your own items' });
        }

        if (type === 'OUT' && item.quantity < quantity) {
            await t.rollback();
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Update item quantity
        if (type === 'IN') {
            item.quantity += quantity;
        } else {
            item.quantity -= quantity;
        }
        await item.save({ transaction: t });

        // Record transaction
        const newTransaction = await Transaction.create({
            itemId: id,
            type,
            quantity,
            userId,
        }, { transaction: t });

        await t.commit();
        res.json({ item, transaction: newTransaction });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Failed to process stock movement' });
    }
});

// Get transactions for an item
router.get('/:id/transactions', async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        if (item.userId !== userId) return res.status(403).json({ error: 'Unauthorized: You can only view your own item transactions' });
        
        const transactions = await Transaction.findAll({
            where: { itemId: id },
            order: [['createdAt', 'DESC']],
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

module.exports = router;
