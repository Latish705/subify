import mongoose, {Schema} from 'mongoose';

const platformSchema = new mongoose.Schema({
  category: {type: String, required: true},
  name: {type: String, required: true},
  logoImage: {
    type: String,
  },
  plans: [
    {
      plan: {type: String, required: true},
      price: {type: Number, required: true},
    },
  ],
  usersLinked: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

export const Platform = mongoose.model('Platform', platformSchema);
