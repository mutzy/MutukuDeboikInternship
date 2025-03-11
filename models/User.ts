import mongoose, { Document, Schema, Model, models } from "mongoose";

export type UserRole = 'staff' | 'admin';

export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role?: UserRole;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema:Schema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum:['staff','admin'],
        required: true,
        default: 'staff'
    },
},
{timestamps: true}
);

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', userSchema);

export default User;