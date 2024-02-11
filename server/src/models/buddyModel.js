import mongoose from 'mongoose';

const buddySchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  buddy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  platform: {type: mongoose.Schema.Types.ObjectId, ref: 'Platform'},
});

export const Buddy = mongoose.model('Buddy', buddySchema);
