import mongoose from 'mongoose';
import bcrypt from "bcrypt"
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must be at most 30 characters long'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profile: {
        first_name: {
            type: String,
            required: false,
            trim: true
        },
        last_name: {
            type: String,
            required: false,
            trim: true
        },
        bio: {
            type: String,
            required: false,
            trim: true
        },
        profile_picture: {
            type: String,
            required: false
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['author', 'admin', 'subscriber'],
        default: 'author'
    }
});
// Middleware to update `updated_at` before saving
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    update.updated_at = Date.now();
    if (update.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
        } catch (error) {
            return next(error);
        }
    }
    next();
});
userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();  // Only hash the password if it's been modified
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Compare the provided password with the hashed password in the database
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
