import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  post: {type: String, required: true},
  price: {type: Number, required: true},
  comments: [
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      comment: {type: String},
    },
  ],
});

export const Post = mongoose.model('Post', PostSchema);
