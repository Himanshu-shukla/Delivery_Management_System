// test/controllers/authController.test.ts
import { register, login } from '../../src/controllers/authController';
import User from '../../src/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test_db');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password', role: 'User' });
    expect(response.status).toBe(201);
  });

  it('should login an existing user', async () => {
    const user = new User({ email: 'test@example.com', password: await bcrypt.hash('password', 10), role: 'User' });
    await user.save();
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});