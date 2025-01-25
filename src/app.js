const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error.middleware'); // Updated import
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');
const paymentRoutes = require('./routes/payment.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

module.exports = app;
