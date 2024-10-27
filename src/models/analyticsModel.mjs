import  mongoose from 'mongoose';
const { Schema } = mongoose;

const analyticsSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',  // Reference to the post
    required: true
  },
  viewed_by:[{
    user_id:{
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user
    unique: true
    }
  }],
  viewed_sessions:[{
    session_id: {
      type: String,
      unique: true
    },
  }],
  vote_by:[{ //only users can vote
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Reference to the user
      unique: true
    }
  }],
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative'],
  },
  voting: {
    upvotes: {
      type: Number,
      default: 0,
      min: [0, 'Upvotes cannot be negative'],
    },
    downvotes: {
      type: Number,
      default: 0,
      min: [0, 'Downvotes cannot be negative'],
    }
  },
  updated_at: {
    type: Date,
    default: Date.now  // Default to the current date and time
  }
});

analyticsSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    update.updated_at = Date.now();
    next();
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
