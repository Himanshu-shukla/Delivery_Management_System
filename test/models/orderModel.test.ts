import Order from '../../src/models/orderModel';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test_db');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Order Model', () => {
  it('should create a new order with generated orderId', async () => {
    const order = new Order({
      customerName: 'John Doe',
      deliveryAddress: '123 Main St',
      totalAmount: 100
    });
    await order.save();
    expect(order.orderId).toBeDefined();
    expect(order.orderId.length).toBe(6);
  });
});