const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./db');
const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth');
const reportsRoutes = require('./routes/reports');
require('./models/Item');
require('./models/Transaction');
require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportsRoutes);

app.get('/', (req, res) => {
    res.send('School Stock Management API is running');
});

const startServer = async () => {
    await connectDB();
    await sequelize.sync({ alter: true }); // Sync models to DB
    console.log('Database synced');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
