import mongoose, { Schema, Document } from 'mongoose';

interface Route extends Document {
  routeId: string;
  orderId: string;
  steps: { location: string; timestamp: Date }[];
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const routeSchema = new Schema<Route>({
  routeId: {
    type: String,
    unique: true,
    required: true,
    default: function () {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return code;
    },
  },
  orderId: {
    type: String,
    required: true
  },
  steps: {
    type: [{ location: String, timestamp: Date }],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<Route>('Route', routeSchema);