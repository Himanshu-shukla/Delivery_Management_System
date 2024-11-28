import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const mongoURI = 'mongodb+srv://crazyphoton150hs:C00!buddy@cluster0.4mq6pjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}