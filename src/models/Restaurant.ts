import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
    name: string;
    cuisineType: string;
    address: string;
}

const restaurantSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true
    },
    cuisineType: {
        type: String,
        required: [true, 'Cuisine type is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Restaurant address is required'],
        trim: true
    }
}, { timestamps: true });

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);