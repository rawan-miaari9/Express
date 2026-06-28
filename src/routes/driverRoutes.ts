import express from 'express';
import { getAllDrivers, createDriver } from '../controllers/driverController.js';

const router = express.Router();

router.route('/')
    .get(getAllDrivers)
    .post(createDriver);

export default router;