const express = require('express');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json());

function setupCORS(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
app.use(setupCORS);
app.all('/*', setupCORS);
// Routes
app.use('/users', authMiddleware, userRoutes);
app.use('/reservations', reservationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;