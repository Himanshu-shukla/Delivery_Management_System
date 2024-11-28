import mongoose, { Schema, Document } from "mongoose";

interface Driver extends Document {
  driverId: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
  distanceTraveled: number; 
  timeSpentOnline: number; 
  orders: mongoose.Types.ObjectId[]; 
}

const driverSchema = new Schema<Driver>({
  driverId: {
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
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  distanceTraveled: {
    type: Number,
    default: 0,
  },
  timeSpentOnline: {
    type: Number,
    default: 0,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});


const Driver = mongoose.model<Driver>('Driver', driverSchema);


const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string) => {
  return typeof phone === "string" && phone.length >= 10;
};

driverSchema.pre("save", async function (next) {
  if (!this.driverId) {
    const maxAttempts = 5;
    let driverId = generateDriverId();
    let attempts = 0;
    while ((await Driver.findOne({ driverId })) && attempts < maxAttempts) {
      driverId = generateDriverId();
      attempts++;
    }
    if (attempts >= maxAttempts) {
      next(
        new Error("Could not generate unique driverId after multiple attempts.")
      );
    } else {
      this.driverId = driverId;
      next();
    }
  } else {
    this.updatedAt = new Date(); 
    next();
  }
});

function generateDriverId(): string {
  const length = 6;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let driverId = "";
  for (let i = 0; i < length; i++) {
    driverId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return driverId;
}

driverSchema.index({ driverId: 1 });
driverSchema.index({ email: 1 }, { unique: true });
driverSchema.index({ phone: 1 }, { unique: true });

export default mongoose.model<Driver>("Driver", driverSchema);
