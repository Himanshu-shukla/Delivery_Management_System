import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const mongoURI = 'mongodb://localhost:27017/delivery_management_db'; // Replace with your MongoDB URI
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
}