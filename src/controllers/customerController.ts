import { Request, Response, NextFunction } from 'express';
import Customer from '../models/Customer.js';
import { CustomError } from '../utils/CustomError.js';

export const getAllCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await Customer.countDocuments();
        const customers = await Customer.find().skip(skip).limit(limit);

        res.status(200).json({
            status: 'success',
            page,
            limit,
            totalResults: total,
            totalPages: Math.ceil(total / limit),
            data: customers
        });
    } catch (err) { next(err); }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return next(new CustomError('No customer record matched that identifier token', 404));
        res.status(200).json({ status: 'success', data: customer });
    } catch (err) { next(err); }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { fullName, email, phoneNumber, address } = req.body;
        if (!fullName || !email || !phoneNumber) return next(new CustomError('Initialization parameters profile missing primary details', 400));
        
        const newCustomer = await Customer.create({ fullName, email, phoneNumber, address });
        res.status(201).json({ status: 'success', data: newCustomer });
    } catch (err: any) {
        if (err.code === 11000) return next(new CustomError('Unique data conflict: Email or phone number registration index already populated', 400));
        next(err);
    }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return next(new CustomError('No customer data target matched that identifier string', 404));
        res.status(200).json({ status: 'success', data: updated });
    } catch (err) { next(err); }
};

export const deleteCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return next(new CustomError('No customer payload records found matching target deletion scope', 404));
        res.status(204).json({ status: 'success', data: null });
    } catch (err) { next(err); }
};