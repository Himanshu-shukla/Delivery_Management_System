import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  role: 'Admin' | 'Driver' | 'User';
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Driver', 'User'],
    default: 'User'
  }
});

export default mongoose.model<User>('User', userSchema);