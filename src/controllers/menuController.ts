import { Request, Response, NextFunction } from 'express';
import MenuItem from '../models/MenuItem.js';
import { CustomError } from '../utils/CustomError.js';

export const getAllMenuItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await MenuItem.countDocuments();
        const items = await MenuItem.find().populate('restaurantId', 'name').skip(skip).limit(limit);

        res.status(200).json({
            status: 'success',
            page,
            limit,
            totalResults: total,
            totalPages: Math.ceil(total / limit),
            data: items
        });
    } catch (err) { next(err); }
};

export const getMenuItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const item = await MenuItem.findById(req.params.id).populate('restaurantId', 'name');
        if (!item) return next(new CustomError('Target menu inventory item profile failed lookup criteria matches', 404));
        res.status(200).json({ status: 'success', data: item });
    } catch (err) { next(err); }
};

export const createMenuItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { restaurantId, name, price, description, isAvailable } = req.body;
        if (!restaurantId || !name || !price) return next(new CustomError('Product initialization catalog profile requires core price structures', 400));

        const newItem = await MenuItem.create({ restaurantId, name, price, description, isAvailable });
        res.status(201).json({ status: 'success', data: newItem });
    } catch (err) { next(err); }
};

export const updateMenuItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return next(new CustomError('Cannot commit updates to product array: Identity context not resolved', 404));
        res.status(200).json({ status: 'success', data: updated });
    } catch (err) { next(err); }
};

export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (!item) return next(new CustomError('Deletion operation halted: Catalog mapping document target reference not resolved', 404));
        res.status(204).json({ status: 'success', data: null });
    } catch (err) { next(err); }
};