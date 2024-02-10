import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;