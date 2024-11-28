import mongoose, { Schema, Document } from "mongoose";

interface Order extends Document {
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  orderStatus: "pending" | "dispatched" | "delivered" | "canceled";
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>({
  orderId: {
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
  customerName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "dispatched", "delivered", "canceled"],
    default: "pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});



export default mongoose.model<Order>("Order", orderSchema);
