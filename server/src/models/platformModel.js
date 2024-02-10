const platformSchema = new Schema({
  category: {type: String, required: true},
  name: {type: String, required: true},
  plans: [
    {
      plan: {type: String, required: true},
      price: {type: Number, required: true},
    },
  ],
  usersLinked: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

export default Platform = mongoose.model('Platform', platformSchema);
