import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the provided URL from the environment variables.
 *
 * @return {Promise<void>} A promise that resolves when the connection is successful, or rejects with an error if there is any issue connecting to the database.
 */
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

/**
 * Closes the connection to the MongoDB database.
 *
 * @return {Promise<void>} A promise that resolves when the connection is successfully closed.
 */
const closeDB = async () => {
  mongoose.connection.close();
  console.log('MongoDB disconnected');
};

export { connectDB, closeDB };
