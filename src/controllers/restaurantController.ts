import { Request, Response, NextFunction } from 'express';
import Restaurant from '../models/Restaurant.js';
import { CustomError } from '../utils/CustomError.js';

export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const total = await Restaurant.countDocuments();
        const restaurants = await Restaurant.find().skip(skip).limit(limit);

        res.status(200).json({
            status: 'success',
            page,
            limit,
            totalResults: total,
            totalPages: Math.ceil(total / limit),
            data: restaurants
        });
    } catch (err) { next(err); }
};

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return next(new CustomError('No restaurant storefront tracking data matches that reference', 404));
        res.status(200).json({ status: 'success', data: restaurant });
    } catch (err) { next(err); }
};

export const createRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, cuisineType, address, phoneNumber } = req.body;
        if (!name || !cuisineType || !address) return next(new CustomError('Mandatory layout infrastructure parameters unfulfilled', 400));

        const newRestaurant = await Restaurant.create({ name, cuisineType, address, phoneNumber });
        res.status(201).json({ status: 'success', data: newRestaurant });
    } catch (err) { next(err); }
};

export const updateRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return next(new CustomError('Target entity record update vector failed to resolve via identifier link', 404));
        res.status(200).json({ status: 'success', data: updated });
    } catch (err) { next(err); }
};

export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) return next(new CustomError('Target store mapping cannot execute terminal deletion cycle: Missing ID reference match', 404));
        res.status(204).json({ status: 'success', data: null });
    } catch (err) { next(err); }
};