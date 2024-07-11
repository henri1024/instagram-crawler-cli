import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const url: string = process.env.MONGODB_URL || '';

    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const closeDB = async () => {
  mongoose.connection.close();
  console.log('MongoDB disconnected');
};

export { connectDB, closeDB };
