import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order.js';
import { CustomError } from '../utils/CustomError.js';

export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await Order.countDocuments();
        const orders = await Order.find()
            .populate('customerId', 'fullName phoneNumber')
            .populate('restaurantId', 'name address')
            .populate('driverId', 'fullName phoneNumber')
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            status: 'success',
            page,
            limit,
            totalResults: total,
            totalPages: Math.ceil(total / limit),
            data: orders
        });
    } catch (err) { next(err); }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId', 'fullName')
            .populate('restaurantId', 'name')
            .populate('driverId', 'fullName');
            
        if (!order) return next(new CustomError('Pipeline tracking lookup failure: Invoice processing ticket matching that target reference was not generated', 404));
        res.status(200).json({ status: 'success', data: order });
    } catch (err) { next(err); }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { customerId, restaurantId, driverId, totalAmount, status } = req.body;
        if (!customerId || !restaurantId || !totalAmount) return next(new CustomError('Invoice tracking record compilation pipeline aborting: Missing relational keys', 400));

        const newOrder = await Order.create({ customerId, restaurantId, driverId, totalAmount, status });
        res.status(201).json({ status: 'success', data: newOrder });
    } catch (err) { next(err); }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return next(new CustomError('Execution error altering logistics metadata: Document link could not be parsed', 404));
        res.status(200).json({ status: 'success', data: updated });
    } catch (err) { next(err); }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return next(new CustomError('Transaction history maintenance terminal processing block: Reference data targeting removal could not resolve mapping contexts', 404));
        res.status(204).json({ status: 'success', data: null });
    } catch (err) { next(err); }
};