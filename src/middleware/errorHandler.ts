import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Handle invalid MongoDB Object IDs (e.g., /api/customers/123)
    if (err.name === 'CastError') {
        err = new CustomError(`Invalid dynamic path format: ${err.value} at field ${err.path}`, 400);
    }

    // Handle Mongoose Schema Validation Failures
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((el: any) => el.message);
        err = new CustomError(`Data structure validation failed: ${errors.join('. ')}`, 400);
    }

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};