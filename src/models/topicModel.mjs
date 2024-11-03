import mongoose from 'mongoose';
const { Schema } = mongoose;

const topicSchema = new Schema({
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
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

// Pre-update hook to update `updated_at` on every update
topicSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    update.updated_at = Date.now();
    next();
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
