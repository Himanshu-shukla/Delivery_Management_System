import mongoose from "mongoose";
import Driver from "../../src/models/driverModel"; // Ensure the path is correct
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Driver Model", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  }, 10000); // Increase timeout

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Driver.deleteMany({});
  });

  it("should create and save a new driver successfully", async () => {
    const validDriver = new Driver({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      vehicleType: "car",
      status: "active",
      distanceTraveled: 0,
      timeSpentOnline: 0,
      orders: [],
    });

    const savedDriver = await validDriver.save();

    expect(savedDriver._id).toBeDefined();
    expect(savedDriver.driverId).toBeDefined();
    expect(savedDriver.name).toBe(validDriver.name);
    expect(savedDriver.email).toBe(validDriver.email);
    expect(savedDriver.phone).toBe(validDriver.phone);
    expect(savedDriver.vehicleType).toBe(validDriver.vehicleType);
    expect(savedDriver.status).toBe(validDriver.status);
    expect(savedDriver.distanceTraveled).toBe(validDriver.distanceTraveled);
    expect(savedDriver.timeSpentOnline).toBe(validDriver.timeSpentOnline);
    expect(savedDriver.orders).toEqual(validDriver.orders);
  });

  it("should fail to save a driver without required fields", async () => {
    const driverWithoutRequiredFields = new Driver({});

    await expect(driverWithoutRequiredFields.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should fail to save a driver with an invalid email", async () => {
    const driverWithInvalidEmail = new Driver({
      name: "John Doe",
      email: "invalid-email",
      phone: "1234567890",
      vehicleType: "car",
      status: "active",
      distanceTraveled: 0,
      timeSpentOnline: 0,
      orders: [],
    });

    await expect(driverWithInvalidEmail.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should fail to save a driver with a duplicate email", async () => {
    const firstDriver = new Driver({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      vehicleType: "car",
      status: "active",
      distanceTraveled: 0,
      timeSpentOnline: 0,
      orders: [],
    });

    await firstDriver.save();

    const secondDriver = new Driver({
      name: "Jane Doe",
      email: "john.doe@example.com",
      phone: "0987654321",
      vehicleType: "bike",
      status: "active",
      distanceTraveled: 0,
      timeSpentOnline: 0,
      orders: [],
    });

    await expect(secondDriver.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });

  it("should generate a unique driverId", async () => {
    const driver1 = new Driver({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      vehicleType: "car",
      status: "active",
      distanceTraveled: 0,
      timeSpentOnline: 0,
      orders: [],
    });

    const driver2 = new Driver({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "0987654321",
      vehicleType: "bike",
      status: "active",
      distanceTraveled: 0,
      timeSpentOnline: 0,
      orders: [],
    });

    const savedDriver1 = await driver1.save();
    const savedDriver2 = await driver2.save();

    expect(savedDriver1.driverId).toBeDefined();
    expect(savedDriver2.driverId).toBeDefined();
    expect(savedDriver1.driverId).not.toBe(savedDriver2.driverId);
  });
});