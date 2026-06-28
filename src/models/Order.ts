import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customer: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
    menuItems: mongoose.Types.ObjectId[];
    driver?: mongoose.Types.ObjectId;
    totalPrice: number;
    status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
}

const orderSchema: Schema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'An order must belong to a customer']
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'An order must come from a restaurant']
    },
    menuItems: [{
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: [true, 'An order must contain at least one menu item']
    }],
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    totalPrice: {
        type: Number,
        required: [true, 'An order must have a total price'],
        min: [0, 'Price cannot be negative']
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', orderSchema);