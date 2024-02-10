import mongoose from 'mongoose';

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  enrolledPlatforms: [
    {
      platform: {type: Schema.Types.ObjectId, ref: 'Platform'},
      timeSpent: {type: Number, default: 0},
      moneyPaid: {type: Number, default: 0},
    },
  ],
  interestedPlatforms: [{type: Schema.Types.ObjectId, ref: 'Platform'}],
  linkedTo: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      platform: {type: Schema.Types.ObjectId, ref: 'Platform'},
    },
  ],
});

export const User = mongoose.model('User', userSchema);
