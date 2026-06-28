import { Request, Response, NextFunction } from 'express';
import Driver from '../models/Driver.js';
import { CustomError } from '../utils/CustomError.js';

// @desc    Get all drivers
// @route   GET /api/drivers
export const getAllDrivers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const drivers = await Driver.find();
        res.status(200).json({
            status: 'success',
            results: drivers.length,
            data: drivers
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a new driver
// @route   POST /api/drivers
export const createDriver = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { fullName, phoneNumber, vehicleType } = req.body;

        if (!fullName || !phoneNumber || !vehicleType) {
            return next(new CustomError('Please provide full name, phone number, and vehicle type.', 400));
        }

        const newDriver = await Driver.create({ fullName, phoneNumber, vehicleType });

        res.status(201).json({
            status: 'success',
            data: newDriver
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return next(new CustomError('A driver with this phone number already exists.', 400));
        }
        next(err);
    }
};