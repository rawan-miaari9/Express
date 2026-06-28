import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Module Imports
import customerRouter from './routes/customerRoutes.js';
import restaurantRouter from './routes/restaurantRoutes.js';
import menuItemRouter from './routes/menuRoutes.js';
import driverRouter from './routes/driverRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
app.use(express.json());

// Initialize Persistent Infrastructure Links
connectDB();

// API Router Mount Architecture Configurations
app.use('/api/customers', customerRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/menuitems', menuItemRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/orders', orderRouter);

// Standard 404 Fallback Pipeline Filter Interceptor
app.all('*', (req, res, next) => {
    res.status(404).json({ status: 'fail', message: `Routing request execution error: Target pointer mapping path structure ${req.originalUrl} does not resolve contexts on this host workspace context location link module` });
});

// Centralized Validation Processing Error Catch Point Interceptor Link Pipeline
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 System environment initialization success: Connection gateway established on port allocation context: ${PORT}`));