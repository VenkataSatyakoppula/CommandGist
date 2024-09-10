import mongoose from 'mongoose';
const { Schema } = mongoose;

const gistSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title must be at least 5 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [10, 'Content must be at least 10 characters long'],
    },
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: {
        type: [String],
        required: false,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length >= 0;
            },
        },
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    published_at: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    }
});

// Pre-update hook to update `updated_at` on every update
gistSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    update.updated_at = Date.now();
    next();
});

const Gist = mongoose.model('Gist', gistSchema);

export default Gist;
