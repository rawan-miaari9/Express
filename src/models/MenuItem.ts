import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    restaurant: mongoose.Types.ObjectId;
    isAvailable: boolean;
}

const menuItemSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'A menu item must belong to a restaurant']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);