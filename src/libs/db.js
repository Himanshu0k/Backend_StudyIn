/*
global process
*/

import mongoose from 'mongoose';

// require('dotenv').config();

const connectDB = async () => {
  try {
   console.log(process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
