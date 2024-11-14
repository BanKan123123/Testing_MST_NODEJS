import { Schema, model } from "mongoose";

const useShema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String },
    bio: { type: String },
    expertise: { type: [String], required: true },
    experience: { type: Number, required: true },
    role: { type: String, enum: ['admin', 'creator', 'member'], required: true },
    status: { type: String, enum: ['active', 'inactive'], defaul: 'active', required: true },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLoginAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

export default model('usersMana', useShema);