import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true,'Please provide a email'],
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true,'Please provide a username'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,'Please provide a password'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: null,
    },
    resetPasswordCode: {
        type: String,
        default: null,
    },
    friendsList: {
        type: Array,
        default: [],
    },
    friendRequests: {
        type: Array,
        default: [],
    },
    sentRequests: {
        type: Array,
        default: [],
    },
    notifications: {
        type: [String],
        default: [],
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dpuyyqx6f/image/upload/v1631879613/default-user-image.png",
    },Array});
const User =mongoose.models.users || mongoose.model("users", userSchema);

export default User;