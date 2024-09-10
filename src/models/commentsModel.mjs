import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  gist_id: {
    type: Schema.Types.ObjectId,
    ref: 'Gist',  // Reference to the post
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who commented
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

commentSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    update.updated_at = Date.now();
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
