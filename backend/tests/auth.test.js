import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('GET /api/user', () => {
  let token;

  // Run before tests: connect to the database and obtain a token
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Signup or signin to obtain a valid token. Adjust as needed:
    const res = await request(app)
      .post('/api/auth/signin')
      .send({ email: 'john@example.com', password: 'password123' });
    token = res.body.token;
  });

  // Close connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return filtered users', async () => {
    const response = await request(app)
      .get('/api/user?filter=John')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    // Further assertions can be added here based on your expected output
    expect(Array.isArray(response.body)).toBe(true);
  });
});
