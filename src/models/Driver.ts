import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
    fullName: string;
    phoneNumber: string;
    vehicleType: 'bicycle' | 'motorcycle' | 'car';
    isAvailable: boolean;
}

const driverSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Driver full name is required'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Driver phone number is required'],
        unique: true,
        trim: true
    },
    vehicleType: {
        type: String,
        enum: ['bicycle', 'motorcycle', 'car'],
        required: [true, 'Vehicle type is required']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model<IDriver>('Driver', driverSchema);