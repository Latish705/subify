import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
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
  platformInterested: [{type: String, required: false}],
});

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
