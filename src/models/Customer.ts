import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    fullName: string;
    phoneNumber: string;
    address: string;
}

const customerSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Customer full name is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Delivery address is required']
    }
}, { timestamps: true });

export default mongoose.model<ICustomer>('Customer', customerSchema);