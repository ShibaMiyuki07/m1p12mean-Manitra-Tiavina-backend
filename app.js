const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const utilRoutes = require('./routes/utilRoutes');
const authMiddleware = require('./middleware/authMiddleware');


const {json} = require("body-parser");
const {join} = require("node:path");

const app = express();

// Middleware
app.use(express.json());
app.use('/pictures', express.static(join(__dirname, 'pictures')));
app.use(json());

app.use(cors({
    origin: 'http://localhost:4200', // Autorise uniquement votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Routes
app.use('/users', authMiddleware, userRoutes);
app.use('/reservations', reservationRoutes);
app.use('/products', productRoutes);
app.use('/stocks', stockRoutes);
app.use('/utils',utilRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;